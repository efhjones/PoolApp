import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

// game id
interface Game {
  id: string
}

// user id
interface EventData {
  userId: string
}

export default async (event: FunctionEvent<EventData>) => {

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { userId } = event.data

    // create new game
    const gameId = await createNewGame(api, userId)

    return { data: { id: gameId,  } }
  } catch (e) {
    return { error: 'An unexpected error occured during signup.' }
  }
}

async function createNewGame(api: GraphQLClient, userId: string): Promise<string> {
  const mutation = `
    mutation createGame($userId: String!) {
      createGame(
        id: $userId
      ) {
        id
      }
    }
  `

  const variables = {
    userId,
  }

  return api.request<{ createNewGame: Game }>(mutation, variables)
    .then(r => r.createNewGame.id)
}

