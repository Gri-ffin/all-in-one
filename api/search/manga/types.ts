import type { Image, Pagination } from '../../types'

interface MangaSearch {
  mal_id: number
  url: string
  images: Image
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  status: string
  publishing: boolean
  rating: string
  rank: number
  season: string
  popularity: number
  score: number
  published: {
    from: string
  }
}

export interface MangaSearchResponse {
  data: AnimeSearch[]
  pagination: Pagination
}
