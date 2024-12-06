import prisma from "../config/prismaClient.js";
import dotenv from "dotenv";


dotenv.config(); 


export const getProductos = async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        Categoria: true, 
      },
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};



export const createProducto = async (req, res) => {
  const { nombre, descripcion, categoriaId } = req.body;

  try {
    const newProducto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        categoriaId,
      },
    });

    res.status(201).json({
      message: "Producto creado exitosamente",
      producto: newProducto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};


export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, categoriaId } = req.body;

  try {
    const updatedProducto = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        descripcion,
        categoriaId,
      },
    });

    res.json({
      message: "Producto actualizado exitosamente",
      producto: updatedProducto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};


export const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.producto.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};



