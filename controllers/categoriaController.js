import prisma from "../config/prismaClient.js";
import dotenv from "dotenv";


dotenv.config();


export const getCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las categorías" });
  }
};


export const createCategoria = async (req, res) => {
  const { nombre } = req.body;

  try {
    const newCategoria = await prisma.categoria.create({
      data: {
        nombre,
      },
    });
    res.status(201).json({
      message: "Categoría creada exitosamente",
      categoria: newCategoria,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la categoría" });
  }
};


export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const updatedCategoria = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: { nombre },
    });
    res.json({
      message: "Categoría actualizada exitosamente",
      categoria: updatedCategoria,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la categoría" });
  }
};


export const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.categoria.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Categoría eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la categoría" });
  }
};




