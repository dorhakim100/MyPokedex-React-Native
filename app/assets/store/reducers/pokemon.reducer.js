import { pokemonService } from '../../services/pokemon/pokemon.service'

export const SET_POKEMONS = 'SET_POKEMONS'
export const SET_POKEMON = 'SET_POKEMON'
export const REMOVE_POKEMON = 'REMOVE_POKEMON'
export const ADD_POKEMON = 'ADD_POKEMON'
export const ADD_NEW_POKEMON = 'ADD_NEW_POKEMON'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
  pokemons: [],
  currPokemon: pokemonService.getEmptyPokemon(),
  myPokemons: [],
  filter: pokemonService.getDefaultFilter(),
}

export function pokemonReducer(state = initialState, action) {
  var newState = state
  var pokemons
  switch (action.type) {
    case SET_POKEMONS:
      newState = { ...state, pokemons: action.pokemons }
      break
    case SET_POKEMON:
      newState = { ...state, currPokemon: action.currPokemon }
      break
    case REMOVE_POKEMON:
      const lastRemovedItem = state.myPokemons.find(
        (pokemonToFind) => pokemonToFind._id === action.pokemonId
      )
      pokemons = state.myPokemons.filter(
        (pokemonToFind) => pokemonToFind._id !== action.pokemonId
      )
      newState = { ...state, myPokemons: pokemons, lastRemovedItem }
      break
    case ADD_POKEMON:
      pokemons = state.myPokemons
      const { pokemonToAdd } = action
      if (
        pokemons.find(
          (pokemonToCheck) => pokemonToCheck._id === pokemonToAdd._id
        )
      )
        return newState

      newState = {
        ...state,
        myPokemons: [pokemonToAdd, ...pokemons],
      }

      break
    case ADD_NEW_POKEMON:
      const { newPokemon } = action

      newState = {
        ...state,
        pokemons: [newPokemon, ...pokemons],
      }

      break

    case SET_FILTER:
      newState = { ...state, filter: action.filterToSet }

      break

    default:
      return newState
  }
  return newState
}

// unitTestReducer()

function unitTestReducer() {
  var state = initialState
  const pokemon1 = {
    _id: 'b101',
    vendor: 'Pokemon ' + parseInt(Math.random() * 10),
    msgs: [],
  }
  const pokemon2 = {
    _id: 'b102',
    vendor: 'Pokemon ' + parseInt(Math.random() * 10),
    msgs: [],
  }

  state = pokemonReducer(state, { type: SET_ITEMS, pokemons: [pokemon1] })

  state = pokemonReducer(state, { type: ADD_ITEM, pokemon: pokemon2 })

  state = pokemonReducer(state, {
    type: UPDATE_ITEM,
    pokemon: { ...pokemon2, vendor: 'Good' },
  })

  state = pokemonReducer(state, { type: REMOVE_ITEM, pokemonId: pokemon2._id })

  const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
  state = pokemonReducer(state, {
    type: ADD_ITEM_MSG,
    pokemonId: pokemon1._id,
    msg,
  })

  state = pokemonReducer(state, { type: REMOVE_ITEM, pokemonId: pokemon1._id })
}
