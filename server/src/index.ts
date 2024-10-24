import * as dotenv from 'dotenv';
dotenv.config();
import Fastify from 'fastify'
import { loghello } from "./services/test"
import { getPlayersStatsByGameId } from './services/databaseService';


const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return 'Hello there! 👋';
})

fastify.get<{Params: {gameid: string}}>("/statsforgame/:gameid", async (request, reply) => {
  try{
const gameId = parseInt(request.params.gameid)
return await getPlayersStatsByGameId(gameId);
  }
  catch(err){
    fastify.log.error(`Error getting stats for specific gameId ${err}`)
    throw err;
  }
})

const start = async () => {
  if (!process.env.PUBLIC_PORT){
    throw new Error("port not found")
  }
  try {
    console.log("starting server")
    // await getPlayersStatsByGameId(15);
    await fastify.listen({ port: parseInt(process.env.PUBLIC_PORT) });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();