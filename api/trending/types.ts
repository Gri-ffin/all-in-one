import type { Anime, Manga } from '../types'

export interface AnimeResponse {
  data: Anime[]
}

export interface MangaResponse {
  data: Manga[]
}

export type AnimeTopType = 'airing' | 'favorite' | 'upcoming'
export type MangaTopType = 'publishing' | 'upcoming' | 'favorite'
