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
    const gameId = await createGame(api, userId)

    return { data: { id: gameId,  } }
  } catch (e) {
    return { error: 'An unexpected error occured during signup.' }
  }
}

async function createGame(api: GraphQLClient, userId: string): Promise<string> {
  const mutation = `
    mutation createNewGame($userId: String!) {
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

  return api.request<{ createGame: Game }>(mutation, variables)
    .then(r => r.createGame.id)
}
