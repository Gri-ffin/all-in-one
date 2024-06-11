import { MYANIMELIST_API } from '@/constants'
import axios from 'axios'

// TODO: this should accept an api url to change between providers
export const getTrendingAnime = async () => {
  const response = await axios.get(
    MYANIMELIST_API + '/top/anime?limit=10&filter=airing'
  )
  return response.data
}
