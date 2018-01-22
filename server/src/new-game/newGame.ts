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

interface NewTeam {
  id: string,
  players: Array<{ id: string, email: string}>,
  gameId: string
}

interface Game {
  id: string
  teams: {
    id: string,
    players: {
      id: string,
      email: string
    }
  }
}

export default async (event: FunctionEvent<EventData>) => {

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { userId } = event.data;
    // create new game
    const gameId = await createNewGame(api, userId);

    const inititalTeamOne = await createTeam(api, gameId);
    const inititalTeamTwo = await createTeam(api, gameId);

    return { data: { id: gameId } }
  } catch (e) {
    return { error: 'Oh Nooooooooo! An unexpected error occured during new game creation.', e }
  }
}

async function createNewGame(api: GraphQLClient, userId: string): Promise<string> {
  const mutation = `
    mutation createNewGame($userId: ID!) {
      createGame(
        creatorIdId: $userId,
        inProgress: false
      ) {
        id,
        teams {
          id,
          players {
            id,
            email
          }
        }
      }
    }
  `

  const variables = {
    userId
  };

  return api.request<{ createGame: NewGame }>(mutation, variables)
    .then((r => r.createGame.id))
}

async function createTeam(api: GraphQLClient, gameId: string): Promise<NewTeam> {
  const mutation = `
    mutation createTeam($gameId: ID!) {
      createTeam(
        gameId: $gameId
      ) {
        game {
          teams {
            id,
            players {
              id,
              email
            }
          }
        }
      }
    }
  `

  const variables = {
    gameId
  };

  return api.request<{ createTeam: NewTeam }>(mutation, variables)
  .then((r => r.createTeam))

}
