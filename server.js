import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import facturaRoutes from "./routes/facturaRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import ordenRoutes from "./routes/ordenRoutes.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();



app.use(cors());

 

app.use(express.json());


app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});


app.use('/api', authRoutes);
app.use('/api', ordenRoutes);
app.use('/api', facturaRoutes);
app.use('/api', productoRoutes);
app.use('/api', categoriaRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;

