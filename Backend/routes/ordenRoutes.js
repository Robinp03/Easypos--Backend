import express from "express";
import { getOrdenes, createOrden, getDetallesOrden, deleteOrden, createDetalleOrden } from "../controllers/ordenController.js";

const router = express.Router();


router.get("/getordenes", getOrdenes);

router.post("/createorden", createOrden);

router.post("/createordendetalle", createDetalleOrden);

router.get("/getdetallesorden/:id", getDetallesOrden);

router.delete("/deleteorden/:id", deleteOrden);

export default router;

