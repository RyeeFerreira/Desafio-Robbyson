import prismaClient from "../prisma";

interface IDeleteService {
    id: string;
}

class DeleteService {
    async execute({ id }: IDeleteService) {
        console.log("O valor do id:" + id);
        if (!id) {
            throw new Error("ID inválido");
        }

        const tarefa = await prismaClient.tarefa.findFirst({
            where: {
                id: id
            }
        });

        if (!tarefa) {
            throw new Error("Tarefa não encontrada");
        }

        await prismaClient.tarefa.delete({
            where: {
                id: tarefa.id
            }
        });

        return { message: "Tarefa deletada com sucesso" };
    }
}

export { DeleteService };