import { httpService } from '../http.service'
import { makeId } from '../util.service'

const KEY = 'pokemon'

export const pokemonService = {
  query,
  getById,
  save,
  remove,
  getEmptyPokemon,
  getDefaultFilter,
  getMaxPage,
}

async function query(
  filterBy = {
    txt: '',
    maxPrice: 0,
    sortDir: '',
    types: [],
    pageIdx: 0,
    isAll: false,
  }
) {
  try {
    const pokemons = await httpService.get(KEY, filterBy)

    return pokemons
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function getById(pokemonId, filter) {
  try {
    const res = await httpService.get(`${KEY}/${pokemonId}`, filter)
    return res
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function remove(pokemonId) {
  try {
    return await httpService.delete(`${KEY}/${pokemonId}`)
  } catch (err) {
    console.log(err)
    throw err
  }
}
async function save(pokemon) {
  try {
    var savedPokemon
    if (pokemon._id) {
      savedPokemon = await httpService.put(`${KEY}/${pokemon._id}`, pokemon)
    } else {
      savedPokemon = await httpService.post(KEY, pokemon)
    }
    return savedPokemon
  } catch (err) {
    console.log(err)
    throw err
  }
}

function getEmptyPokemon() {
  return {
    _id: makeId(),
    price: '',
    title: { he: '', eng: '' },
    preview: { he: '', eng: '' },
    types: [],
    cover: '',
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    maxPrice: '',
    sortDir: '',
    types: [],
    pageIdx: 0,
  }
}

async function getMaxPage(filterBy) {
  const PAGE_SIZE = 6

  try {
    var pokemons = await query({ ...filterBy, isAll: true })

    let maxPage = pokemons.length / PAGE_SIZE
    maxPage = Math.ceil(maxPage)
    return maxPage
  } catch (err) {
    console.log(err)
  }
}
