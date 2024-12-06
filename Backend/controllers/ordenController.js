import prisma from "../config/prismaClient.js";
import dotenv from "dotenv";

dotenv.config();


export const getOrdenes = async (req, res) => {
  try {
    const ordenes = await prisma.orden.findMany({
      include: { 
        DetalleOrden: { 
          include: { 
            Producto: { 
              include: { 
                Categoria: true,
               },
              },
             },
           },
         },
      }); 
    res.json(ordenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las órdenes" });
  }
};



export const getDetallesOrden = async (req, res) => {
  const { id } = req.params;

  try {
    const orden = await prisma.orden.findUnique({
      where: { id: parseInt(id) },
      include: {
        DetalleOrden: { 
          include: {
            Producto: true, 
          },
        },
      },
    });

    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json(orden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los detalles de la orden" });
  }
};


export const deleteOrden = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.orden.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Orden eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la orden" });
  }
};


export const createOrden = async (req, res) => {
    const { usuarioId, fecha } = req.body;

    try {
        const nuevaOrden = await prisma.orden.create({
            data: {
                usuarioId: usuarioId,
                fecha: fecha
            }
        });
        res.status(201).json(nuevaOrden);
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};


  
   export const createDetalleOrden = async (req, res) => {
    const { ordenId, productoId, cantidad, precioUnitario } = req.body;

    try {
      const DetalleOrden = await prisma.detalleOrden.create({
        data: {
          ordenId: parseInt(ordenId), 
          productoId: parseInt(productoId), 
          cantidad: parseInt(cantidad), 
          precioUnitario: parseFloat(precioUnitario)
        }
      });

      res.status(201).json(DetalleOrden);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el detalle de la orden' });
    }
  }





