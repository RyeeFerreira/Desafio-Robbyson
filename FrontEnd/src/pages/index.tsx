import { useEffect, useState, useRef, FormEvent } from "react";
import axios from "axios";
import { api } from "../services/api";
import "./style.css";
import lupa from "../assets/images/Vector.png";

const API_URL = "http://localhost:3000/tarefa";

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  concluido: boolean;
  arquivado: boolean;
}

const Home = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editandoTarefa, setEditandoTarefa] = useState<Tarefa | null>(null);
  const [pesquisa, setPesquisa] = useState("");
  const tituloref = useRef<HTMLInputElement>(null);
  const descricaoref = useRef<HTMLInputElement>(null);
  const concluidoref = useRef<HTMLInputElement>(null);
  const arquivadoref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    IniciandoBD();
  }, [deletarTarefa, criarOuEditarTarefa, arquivarTarefa]);

  async function IniciandoBD() {
    const response = await api.get("/tarefas");
    setTarefas(response.data);
  }

  const pesquisar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(event.target.value);
  };

  const tarefasFiltradas = tarefas.filter(
    (tarefa) =>
      tarefa.titulo.toLowerCase().includes(pesquisa.toLowerCase()) &&
      !tarefa.arquivado
  );

  async function criarOuEditarTarefa(event: FormEvent) {
    event.preventDefault();

    if (!tituloref.current) return;

    const tarefaData = {
      id: editandoTarefa?.id, // Adiciona o id da tarefa ao corpo da requisição
      titulo: tituloref.current.value,
      descricao: descricaoref.current?.value,
      concluido: concluidoref.current?.checked,
      arquivado: arquivadoref.current?.checked,
    };

    if (editandoTarefa) {
      // Editar tarefa existente
      await api.put(`/editar`, tarefaData);
      setEditandoTarefa(null);
    } else {
      // Criar nova tarefa
      await api.post("/tarefa", tarefaData);
    }

    setFormVisible(false);
    IniciandoBD();
  }

  async function arquivarTarefa(id: string) {
    try {
      const tarefa = tarefas.find((t) => t.id === id);
      if (tarefa && tarefa.concluido) {
        await api.put(`/editar`, {
          id: tarefa.id,
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          concluido: tarefa.concluido,
          arquivado: true,
        });
        IniciandoBD();
      } else {
        console.log("A tarefa não está concluída ou não foi encontrada.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deletarTarefa(id: string) {
    try {
      await api.delete("/deletar", {
      params: {
        id: id
      }
    });
    } catch (error) {
      console.log(error);
    }
  }

  const handleCadastrarClick = () => {
    setFormVisible(!formVisible);
    setEditandoTarefa(null); // Limpa a tarefa em edição ao abrir o formulário de criação
  };

  const editar = (tarefa: Tarefa) => {
    setEditandoTarefa(tarefa);
    if (tituloref.current) tituloref.current.value = tarefa.titulo;
    if (descricaoref.current) descricaoref.current.value = tarefa.descricao;
    if (concluidoref.current) concluidoref.current.checked = tarefa.concluido;
    if (arquivadoref.current) arquivadoref.current.checked = tarefa.arquivado;
    setFormVisible(true);
  };

  return (
    <div className="body">
      <main className="container">
        <h1>Tarefas</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={pesquisa}
            onChange={pesquisar}
          />
          <button className="lupaButton">
            <img src={lupa} className="lupa" />
          </button>
        </div>
        <button onClick={handleCadastrarClick}>Cadastrar</button>
        {formVisible && (
          <form className="form-container" onSubmit={criarOuEditarTarefa}>
            <input type="text" placeholder="Título" ref={tituloref} />
            <input type="text" placeholder="Descrição" ref={descricaoref} />
            <input type="checkbox" ref={concluidoref} /> Concluído
            <input type="checkbox" ref={arquivadoref} /> Arquivado
            <button type="submit">Salvar</button>
          </form>
        )}
        <div className="tarefas">
          {tarefasFiltradas.map((tarefa) => (
            <div className="tarefa" key={tarefa.id}>
              <p>
                Titulo:<span>{tarefa.titulo}</span>
              </p>
              <p>
                Descrição:<span>{tarefa.descricao}</span>
              </p>
              <section>
                <p>
                  Concluido?<input type="checkbox" name="Concluido?" id="" />
                </p>
                <button onClick={() => editar(tarefa)}>Editar</button>
                <button onClick={() => deletarTarefa(tarefa.id)}>Deletar</button>
                <button onClick={() => arquivarTarefa(tarefa.id)}>Arquivar</button>
              </section>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;