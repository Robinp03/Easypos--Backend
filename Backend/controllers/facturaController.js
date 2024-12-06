import prisma from "../config/prismaClient.js";
import dotenv from "dotenv";

dotenv.config();


export const getFacturas = async (req, res) => {
  try {
    const facturas = await prisma.facturas.findMany({
      include: {
        Orden: {
          include: {
            Usuario: true,
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
        },
      },
    });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las facturas' });
  }
};



export const getFactura = async (req, res) => {
  const { id } = req.params;

  try {
    const factura = await prisma.facturas.findUnique({
      where: { id: parseInt(id) },
      include: {
        Orden: {
          include: {
            Usuario: true, 
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
        },
      },
    });

    if (!factura) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    if (factura.Orden && factura.Orden.Usuario) {
      delete factura.Orden.Usuario.contrasena;
    }

    res.json(factura);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la factura" });
  }
};



export const createFactura = async (req, res) => {
  const { ordenId } = req.body; 

  try {
    
    const orden = await prisma.orden.findUnique({
      where: { id: parseInt(ordenId) },
    });

    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    
    const newFactura = await prisma.facturas.create({
      data: {
        ordenId,
        
      },
      include: {
        Orden: true, 
      },
    });

    
    res.status(201).json({
      message: "Factura creada exitosamente",
      factura: newFactura,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la factura" });
  }
};


export const deleteFactura = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFactura = await prisma.facturas.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Factura eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la factura" });
  }
};

