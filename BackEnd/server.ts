import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rotaTarefas from "./routes/tarefas";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/tarefas", rotaTarefas);

const PORTA = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar:", err));

app.listen(PORTA, () => console.log(`🚀 Servidor rodando na porta ${PORTA}`));

