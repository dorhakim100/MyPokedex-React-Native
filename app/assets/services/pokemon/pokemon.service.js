import Axios from 'axios'

import { storageService } from '../async-storage.service'
import { makeId } from '../utils'

import { httpService } from '../http.service'

const STORAGE_KEY = 'item'
const PAGE_SIZE = 6

const axios = Axios.create({ withCredentials: true })

export const itemService = {
  query,
  getById,
  save,
  remove,

  getEmptyItem,
  getDefaultFilter,
  getMaxPage,
}
window.cs = itemService

async function query(filterBy = { txt: '', price: 0, types: [] }) {
  var items = await storageService.query(STORAGE_KEY)
  const { txt, maxPrice, sortDir, types, pageIdx, isAll } = filterBy

  if (isAll) {
    return items
  }

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    items = items.filter(
      (item) =>
        regex.test(item.title.he) ||
        regex.test(item.title.eng) ||
        regex.test(item.description.he) ||
        regex.test(item.description.eng)
    )
  }
  if (maxPrice) {
    items = items.filter((item) => item.price <= maxPrice)
  }

  if (types.length > 0) {
    items = items.filter((item) =>
      types.some((type) => item.types.includes(type))
    )
  }

  if (sortDir) {
    items.sort((item1, item2) => (item1.price - item2.price) * +sortDir)
  }

  if (pageIdx !== undefined) {
    const startIdx = pageIdx * PAGE_SIZE
    items = items.slice(startIdx, startIdx + PAGE_SIZE)
  }

  return items
}

function getById(itemId) {
  return storageService.get(STORAGE_KEY, itemId)
}

async function remove(itemId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, itemId)
}

async function save(item) {
  var savedItem
  if (item._id) {
    const itemToSave = {
      _id: item._id,
      cover: item.cover,
      preview: item.preview,
      price: item.price,
      stockQuantity: item.stockQuantity,
      title: item.title,
      types: item.types,
    }
    savedItem = await storageService.put(STORAGE_KEY, itemToSave)
  } else {
    const itemToSave = {
      cover:
        'https://res.cloudinary.com/dnxi70mfs/image/upload/v1729010361/cropping_j9auka.webp',
      preview: item.preview,
      price: item.price,
      stockQuantity: item.stockQuantity,
      title: item.title,
      types: [],
    }
    savedItem = await storageService.post(STORAGE_KEY, itemToSave)
  }
  return savedItem
}

function getEmptyItem() {
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
  try {
    var items = await query({ ...filterBy, isAll: true })
    let maxPage = items.length / PAGE_SIZE
    maxPage = Math.ceil(maxPage)
    return maxPage
  } catch (err) {
    console.log(err)
  }
}
