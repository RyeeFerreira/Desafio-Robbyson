import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/tarefa";

interface Tarefa {
  _id: string;
  titulo: string;
  descrição: string;
  data_finalizacao: Date;
  concluido: boolean;
  arquivado: boolean;
}

const Home = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setTarefas(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa._id}>{tarefa.titulo}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
