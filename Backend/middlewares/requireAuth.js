import jwt from 'jsonwebtoken';
import  prisma  from '../config/prismaClient.js'; 

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "No autorizado" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.usuario.findUnique({ where: { id: decoded.userId } });
  
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  
    req.user = user;
    next(); 
  } catch (error) {
    console.error("Error en requireAuth:", error); 
    res.status(401).json({ message: "Token inválido o expirado" });
  }
  
};
