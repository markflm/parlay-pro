import Fastify from 'fastify'
import { loghello } from "./services/test"

const fastify = Fastify();

fastify.get('/', async (request, reply) => {
  return 'Hello there! 👋';
})

const start = async () => {
  try {
    console.log("starting server")
    loghello()
    await fastify.listen({ port: 8080 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();