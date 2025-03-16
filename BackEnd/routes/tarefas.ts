import express from "express";
import { Tarefa } from "../models/tarefa";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const novaTarefa = new Tarefa(req.body);
    await novaTarefa.save();
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tarefa = await Tarefa.find();
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});

export default router;
