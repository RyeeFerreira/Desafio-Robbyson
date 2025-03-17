import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteService } from "../services/DeleteService";

class DeleteController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {id} = request.query as {id: string};
        const deleteService = new DeleteService();
        const response = await deleteService.execute({id});
        reply.send(response);
    }
}

export {DeleteController}

