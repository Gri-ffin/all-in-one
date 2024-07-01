import { MYANIMELIST_API } from '@/constants'
import axios from 'axios'

export const getMangaSearch = async ({ id, pageParam }: { id?: string, pageParam: unknown }) => {
  if (typeof id !== 'string') {
    throw new Error('Error happened during the api call')
  }
  const response = await axios.get(`${MYANIMELIST_API}/manga?q=${id}&page=${pageParam}&limit=10`)
  return response.data
}

