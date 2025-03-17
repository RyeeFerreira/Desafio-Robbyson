import { FastifyRequest, FastifyReply } from "fastify";
import { GetService } from "../services/GetService";

class GetController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const getService = new GetService();
        const response = await getService.execute();

        return reply.send(response);
    }
}

export { GetController };