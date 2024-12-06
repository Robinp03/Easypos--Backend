import express from "express";
import { getProductos, createProducto, updateProducto, deleteProducto } from "../controllers/productoController.js";

const router = express.Router();


router.get("/getproducto", getProductos);

router.post("/createproducto", createProducto);

router.put("/updateproducto/:id", updateProducto);

router.delete("/deleteproducto/:id", deleteProducto);

export default router;

