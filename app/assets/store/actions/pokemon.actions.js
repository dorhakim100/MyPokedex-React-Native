import { pokemonService } from '../../services/pokemon/pokemon.service'
import { store } from '../store'
import {
  SET_POKEMON,
  SET_POKEMONS,
  REMOVE_POKEMON,
} from '../reducers/pokemon.reducer'

export async function loadPokemons(filterBy) {
  try {
    const pokemons = await pokemonService.query(filterBy)

    store.dispatch({
      type: SET_POKEMONS,
      pokemons,
    })
    // store.dispatch({ type: SET_ITEM_FILTER, filter: filterBy })
    return pokemons
  } catch (err) {
    // console.log('Cannot load pokemons', err)
    throw err
  }
}

export async function loadPokemon(pokemonId) {
  const pokemons = pokemonService.getPokemons()
  const pokemon = pokemons.find((mon) => mon._id === pokemonId)
  try {
    store.dispatch({
      type: SET_POKEMON,
      currPokemon: pokemon,
    })
    return pokemon
  } catch (err) {
    // console.log('Cannot load pokemon', err)
    throw err
  }
}

export function removePokemon(pokemonId) {
  try {
    store.dispatch({
      type: REMOVE_POKEMON,
      pokemonId,
    })
  } catch (err) {
    throw err
  }
}
