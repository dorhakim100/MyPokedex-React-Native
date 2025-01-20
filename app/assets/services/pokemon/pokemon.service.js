import Axios from 'axios'

import { storageService } from '../async-storage.service'
import { makeId } from '../utils'

import { httpService } from '../http.service'

const STORAGE_KEY = 'pokemon'
const PAGE_SIZE = 6

const axios = Axios.create({ withCredentials: true })

export const pokemonService = {
  query,
  getById,
  save,
  remove,
  getPokemons,
  getEmptyPokemon,
  getDefaultFilter,
  getMaxPage,
}
window.cs = pokemonService

async function query(filterBy = { txt: '', price: 0, types: [] }) {
  var pokemons = await storageService.query(STORAGE_KEY)
  const { txt, maxPrice, sortDir, types, pageIdx, isAll } = filterBy

  if (isAll) {
    return pokemons
  }

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    pokemons = pokemons.filter(
      (pokemon) =>
        regex.test(pokemon.title.he) ||
        regex.test(pokemon.title.eng) ||
        regex.test(pokemon.description.he) ||
        regex.test(pokemon.description.eng)
    )
  }
  if (maxPrice) {
    pokemons = pokemons.filter((pokemon) => pokemon.price <= maxPrice)
  }

  if (types.length > 0) {
    pokemons = pokemons.filter((pokemon) =>
      types.some((type) => pokemon.types.includes(type))
    )
  }

  if (sortDir) {
    pokemons.sort(
      (pokemon1, pokemon2) => (pokemon1.price - pokemon2.price) * +sortDir
    )
  }

  if (pageIdx !== undefined) {
    const startIdx = pageIdx * PAGE_SIZE
    pokemons = pokemons.slice(startIdx, startIdx + PAGE_SIZE)
  }

  return pokemons
}

function getById(pokemonId) {
  return storageService.get(STORAGE_KEY, pokemonId)
}

async function remove(pokemonId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, pokemonId)
}

async function save(pokemon) {
  var savedPokemon
  if (pokemon._id) {
    const pokemonToSave = {
      _id: pokemon._id,
      cover: pokemon.cover,
      preview: pokemon.preview,
      price: pokemon.price,
      stockQuantity: pokemon.stockQuantity,
      title: pokemon.title,
      types: pokemon.types,
    }
    savedPokemon = await storageService.put(STORAGE_KEY, pokemonToSave)
  } else {
    const pokemonToSave = {
      cover:
        'https://res.cloudinary.com/dnxi70mfs/image/upload/v1729010361/cropping_j9auka.webp',
      preview: pokemon.preview,
      price: pokemon.price,
      stockQuantity: pokemon.stockQuantity,
      title: pokemon.title,
      types: [],
    }
    savedPokemon = await storageService.post(STORAGE_KEY, pokemonToSave)
  }
  return savedPokemon
}

function getEmptyPokemon() {
  return {
    _id: makeId(),
    num: 0,
    name: '',
    types: [''],
    entry: '',
    sprites: {
      picture:
        'https://archives.bulbagarden.net/media/upload/thumb/0/0a/0009Blastoise.png/500px-0009Blastoise.png',
      pixel:
        'https://archives.bulbagarden.net/media/upload/c/c8/Spr_2g_009.png',
    },
  }
}

function getPokemons() {
  const pokemons = [
    {
      _id: 1,
      num: 1,
      name: 'Bulbasaur',
      types: ['grass', 'poison'],
      entry:
        'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/f/fb/0001Bulbasaur.png/500px-0001Bulbasaur.png',
        pixel: 'https://art.pixilart.com/20dc875b721fed5.png',
      },
    },
    {
      _id: 2,
      num: 2,
      name: 'Ivysaur',
      types: ['grass', 'poison'],
      entry:
        'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/8/81/0002Ivysaur.png/500px-0002Ivysaur.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/a/a0/Spr_2g_002.png',
      },
    },
    {
      _id: 3,
      num: 3,
      name: 'Venusaur',
      types: ['grass', 'poison'],
      entry:
        'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/6/6b/0003Venusaur.png/500px-0003Venusaur.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/6/64/Spr_2g_003.png',
      },
    },
    {
      _id: 4,
      num: 4,
      name: 'Charmander',
      types: ['fire'],
      entry:
        'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/2/27/0004Charmander.png/500px-0004Charmander.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/6/6f/Spr_2g_004.png',
      },
    },
    {
      _id: 5,
      num: 5,
      name: 'Charmeleon',
      types: ['fire'],
      entry:
        'When it swings its burning tail, it elevates the temperature to unbearably high levels.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/0/05/0005Charmeleon.png/500px-0005Charmeleon.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/f/f3/Spr_2g_005.png',
      },
    },
    {
      _id: 6,
      num: 6,
      name: 'Charizard',
      types: ['fire', 'flying'],
      entry:
        'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/3/38/0006Charizard.png/500px-0006Charizard.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/c/cc/Spr_2g_006.png',
      },
    },
    {
      _id: 7,
      num: 7,
      name: 'Squirtle',
      types: ['water'],
      entry:
        'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/5/54/0007Squirtle.png/500px-0007Squirtle.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/3/34/Spr_2g_007.png',
      },
    },
    {
      _id: 8,
      num: 8,
      name: 'Wartortle',
      types: ['water'],
      entry:
        'It is recognized by its tail that is large and covered with a rich, thick fur. The tail becomes increasingly deeper in color as Wartortle ages.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/0/0f/0008Wartortle.png/500px-0008Wartortle.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/6/63/Spr_2g_008.png',
      },
    },
    {
      _id: 9,
      num: 9,
      name: 'Blastoise',
      types: ['water'],
      entry:
        'It deliberately makes itself heavy so it can withstand the recoil of the water jets it fires.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/0/0a/0009Blastoise.png/500px-0009Blastoise.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/c/c8/Spr_2g_009.png',
      },
    },
  ]
  return pokemons
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
  try {
    var pokemons = await query({ ...filterBy, isAll: true })
    let maxPage = pokemons.length / PAGE_SIZE
    maxPage = Math.ceil(maxPage)
    return maxPage
  } catch (err) {
    console.log(err)
  }
}
