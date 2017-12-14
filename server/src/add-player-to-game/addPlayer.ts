import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

interface EventData {
  userId: string,
  gameId: string
}

export default async (event: FunctionEvent<EventData>) => {

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { userId, gameId } = event.data;

    const responseGameId = await addPlayerToGame(api, userId, gameId)

    // this needs to match the response expected in the frontend query
    return { data: { gameId: responseGameId } };
  } catch (e) {
    return { error: 'Oh Nooooooooo! An unexpected error occured while trying to add a player to a game.', e }
  }
}

interface AddPlayerToGame {
  gamesGame: {
    id: string
  }
}

async function addPlayerToGame(
  api: GraphQLClient, userId: string, gameId: string
): Promise<string> {
  const mutation = `
    mutation addPlayerToGame($userId: ID!, $gameId: ID!) {
      addToUserInGame(
        playersUserId: $userId,
        gamesGameId: $gameId
     ) {
       gamesGame {
         id
       }
     }
    }
  `

  const variables = {
    userId,
    gameId
  }

  return api.request<{ addToUserInGame: AddPlayerToGame }>(mutation, variables)
    .then((r => r.addToUserInGame.gamesGame.id))
}

