import mongoose from "mongoose";

const TabelaTarefa = new mongoose.Schema({
  titulo: { type: String, required: true },
  descrição: { type: String, default: "" },	
  data_finalizacao: { type: Date, default: null },
  concluido: { type: Boolean, default: false },
  arquivado: { type: Boolean, default: false }
});

export const Tarefa = mongoose.model("Tarefa", TabelaTarefa);
