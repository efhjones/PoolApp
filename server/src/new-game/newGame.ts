import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

// game id
interface NewGame {
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

    const { userId } = event.data;

    // create new game
    const gameId = await createNewGame(api, userId)
    return { data: { id: gameId } }
  } catch (e) {
    return { error: 'Oh Nooooooooo! An unexpected error occured during new game creation.', e }
  }
}

async function createNewGame(api: GraphQLClient, userId: string): Promise<string> {
  const mutation = `
    mutation {
      createGame {
        id
      }
    }
  `

  const variables = {
    userId,
  }

  return api.request<{ createGame: NewGame }>(mutation, variables)
    .then((r => r.createGame.id))
}

