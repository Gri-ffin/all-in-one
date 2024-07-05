import { MYANIMELIST_API } from '@/constants'
import axios from 'axios'
import type { Type } from './types'

export const getTopAnime = async (type: Type) => {
  const response = await axios.get(
    MYANIMELIST_API + `/top/anime?limit=10&filter=${type}`
  )
  return response.data
}

export const getTopManga = async (type: string) => {
  const response = await axios.get(
    MYANIMELIST_API + `/top/manga?limit=10&filter=${type}`
  )
  return response.data
}
