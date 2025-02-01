import client from './client'

import axios from 'axios'

const endpoint = '/pokemon'
import { makeId } from '../services/util.service'

const query = (filter) => client.get(endpoint, filter)

const post = (pokemonToAdd, onProgress) => {
  delete pokemonToAdd._id
  const data = new FormData()

  console.log(pokemonToAdd)

  data.append('num', pokemonToAdd.num)
  data.append('name', pokemonToAdd.name)
  data.append('entry', pokemonToAdd.entry)
  data.append('region', pokemonToAdd.region)

  pokemonToAdd.types.forEach((type, index) => data.append('types', type))

  for (const imageType in pokemonToAdd.sprites) {
    data.append(`sprites[${imageType}]`, pokemonToAdd.sprites[imageType])
    // data.append(`sprites[${imageType}]`, {
    //   name: makeId(),
    //   type: 'image/jpeg',
    //   uri: pokemonToAdd.sprites[imageType],
    // })
  }

  return client.post(`${endpoint}`, data, {
    onUploadProgress: (progress) =>
      onProgress(progress.loaded / progress.total),
  })
}

export const pokemonService = {
  query,
  getDefaultFilter,
  post,
}

function getDefaultFilter() {
  return {
    txt: '',
    region: 'all',
    types: [],
  }
}
