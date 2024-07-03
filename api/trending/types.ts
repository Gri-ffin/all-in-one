import type { Anime, Manga } from '../types'

export interface AnimeResponse {
  data: Anime[]
}

export interface MangaResponse {
  data: Manga[]
}

export type Type = 'airing' | 'favorite'
