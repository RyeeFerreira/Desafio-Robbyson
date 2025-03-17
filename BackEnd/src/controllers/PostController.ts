import { FastifyRequest, FastifyReply } from "fastify";
import { PostService } from "../services/PostService";

class PostController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {titulo, descricao, concluido, arquivado} = request.body as {titulo: string, descricao?: string, concluido?: boolean, arquivado?: boolean};
        const postService = new PostService();
        const response = await postService.execute({ titulo, descricao, concluido, arquivado });

        return reply.send(response);
    }


}

export { PostController };