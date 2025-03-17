import prismaClient from "../prisma";

class GetService {
    async execute() {
        const tarefas = await prismaClient.tarefa.findMany();

        return tarefas;
    }

}

export { GetService };