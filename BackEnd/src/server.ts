import Fastify from 'fastify';
import {routes} from './routes/routes';
import cors  from '@fastify/cors'

const app = Fastify({ logger: true });

const start = async () => {

  await app.register(cors);
  await app.register(routes);

  try {
    await app.listen({port: 3000});
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();