import { MYANIMELIST_API } from '@/constants'
import axios from 'axios'

export const getRandomAnime = async () => {
  const response = await axios.get(MYANIMELIST_API + '/random/anime')
  return response.data
}
