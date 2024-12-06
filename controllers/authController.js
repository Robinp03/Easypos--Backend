import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prismaClient.js"; 
import dotenv from "dotenv";

dotenv.config();


export const registerUser = async (req, res) => {
  const { nombre, email, contrasena, rol } = req.body;

  try {
    
    const userExists = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        contrasena: hashedPassword, 
        rol,
      },
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};


export const loginUser = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    
    const user = await prisma.usuario.findUnique({
      where: { email },
    });
    
    if (!user) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    
    const isMatch = await bcrypt.compare(contrasena, user.contrasena); 
    if (!isMatch) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    
    const token = jwt.sign(
      { userId: user.id, nombre: user.nombre, rol: user.rol },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" } 
    );

    res.json({
      message: "Inicio de sesión exitoso",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};


export const getUser = async (req, res) => {
  try {
    
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    if (!decoded) return res.status(401).json({ message: 'Token inválido' });

    
    const users = await prisma.usuario.findMany();
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};



