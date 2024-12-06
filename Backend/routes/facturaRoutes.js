import express from "express";
import {
  getFacturas,
  getFactura,
  createFactura,
} from "../controllers/facturaController.js";

const router = express.Router();


router.get("/getfacturas", getFacturas);

router.get("/getfactura/:id", getFactura);

router.post("/createfactura", createFactura);

export default router;
