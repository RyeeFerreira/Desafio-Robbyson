import prismaClient from "../prisma";

interface IPutService {
    id: string;
    titulo?: string;
    descricao?: string;
}

class PutService {
    async execute({ id, titulo, descricao }: IPutService) {
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

        await prismaClient.tarefa.update({
            where: {
                id: tarefa.id
            },
            data: {
                titulo: titulo,
                descricao: descricao
            }
        });

        return { message: "Tarefa atualizada com sucesso" };
    }
}

export { PutService };