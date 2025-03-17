import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { PostController } from "../controllers/PostController";
import { GetController } from "../controllers/GetController";
import { DeleteController } from "../controllers/DeleteController";
import { PutController } from "../controllers/PutController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    

  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });

  fastify.post('/tarefa', async (request: FastifyRequest, reply: FastifyReply) => {
    return new PostController().handle(request, reply);

  });

  fastify.get('/tarefas', async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetController().handle(request, reply);
  
  });
  fastify.delete('/deletar', async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteController().handle(request, reply);
  
  });
  fastify.put('/editar', async (request: FastifyRequest, reply: FastifyReply) => {
    return new PutController().handle(request, reply);
  
  });
}