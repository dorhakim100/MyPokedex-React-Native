import client from './client'

const endpoint = '/pokemon'

const query = (filter) => client.get(endpoint, filter)

export const pokemonService = {
  query,
  getDefaultFilter,
}

function getDefaultFilter() {
  return {
    txt: '',
    region: 'all',
    types: [],
  }
}
