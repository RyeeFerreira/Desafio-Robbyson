import { FastifyRequest, FastifyReply } from "fastify";
import { PutService } from "../services/PutService";

class PutController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {id, titulo, descricao} = request.body as {id: string, titulo: string, descricao: string};
        const putService = new PutService();
        const response = await putService.execute({id, titulo, descricao});
        reply.send(response);
    }
}

export {PutController}