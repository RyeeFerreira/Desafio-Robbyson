import prismaClient from "../prisma";

interface TarefaProps {
    titulo: string;
    descricao?: string;
    concluido?: boolean;
    arquivado?: boolean;
}

class PostService {
  async execute({titulo, descricao= "", concluido, arquivado}: TarefaProps) {

    if(!titulo) {
        throw new Error("Titulo é obrigatório");
    }

    const response = await prismaClient.tarefa.create({
        data: {
            titulo,
            descricao,
            concluido,
            arquivado
        }});
        
    return response;
  }
}

export { PostService };