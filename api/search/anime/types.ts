import type { Image } from '../../types'

interface AnimeSearch {
  mal_id: number
  url: string
  images: Image
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  status: string
  airing: boolean
  rating: string
  rank: number
  season: string
  popularity: number
  score: number
  aired: {
    from: string
  }
}

export interface AnimeSearchResponse {
  data: AnimeSearch[]
  pagination: {
    last_visible_page: number
    has_next_page: boolean
    items: {
      count: number
      total: number
      per_page: number
    }
  }
}
