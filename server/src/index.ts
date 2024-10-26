import * as dotenv from 'dotenv';
dotenv.config();
import Fastify, { FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import { loghello } from "./services/test"
import { getPlayersStatsByGameId, getUpcomingGamesByLeagueIdAndSeason } from './services/databaseService';
import { GetUpcomingGamesQueryParams } from './types/FastifyHelpers';


const fastify = Fastify({
  exposeHeadRoutes: true,
  logger: true,
})
fastify.get('/', async (request, reply) => {
  return 'Hello there! 👋';
})

fastify.get<{ Params: { gameid: string } }>("/statsforgame/:gameid", async (request, reply) => {
  try {
    const gameId = parseInt(request.params.gameid)
    return await getPlayersStatsByGameId(gameId);
  }
  catch (err) {
    fastify.log.error(`Error getting stats for specific gameId ${err}`)
    throw err;
  }
})

fastify.get("/upcominggames", {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        leagueid: { type: 'integer', minimum: 1 },
        season: { type: 'integer', minimum: 2024 }
      },
      required: ['leagueid', 'season']
    }
  }
}, async (request: FastifyRequest<{ Querystring: GetUpcomingGamesQueryParams }>, reply) => {
  try {
    const { leagueid, season } = request.query;
    //todo - further query param validation required? or does fastify schema take care of it
    return getUpcomingGamesByLeagueIdAndSeason(leagueid, season)
  }
  catch (err) {
    fastify.log.error(`Error getting upcoming games for leagueId: ${err}`)
    throw err;
  }
})

const start = async () => {
  if (!process.env.PUBLIC_PORT){
    throw new Error("port not found")
  }
  try {
    console.log("starting server")
    await fastify.listen({ port: parseInt(process.env.PUBLIC_PORT) });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();