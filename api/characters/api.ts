import { MYANIMELIST_API } from '@/constants'
import axios from 'axios'

export const getTopCharacters = async () => {
  const response = await axios.get(MYANIMELIST_API + '/top/characters?limit=10')
  return response.data
}
