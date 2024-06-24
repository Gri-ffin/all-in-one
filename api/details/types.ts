import type { Anime, Character, Image } from "../types";

export interface AnimeResponse {
  data: Anime
}

export interface CharacterResponse {
  data: {
    character: Character
    role: string
    voice_actors: {
      person: Character
      language: string
    }[]
  }[]
}

export interface FullCharacterResponse {
  data: {
    mal_id: number
    url: string
    images: Image
    name: string
    name_kanji: string
    nicknames: string[]
    favorites: number
    about: string
    anime: { role: string, anime: AniManga }[]
    manga: { role: string, manga: AniManga }[]
    voices: { language: string, person: Character }[]
  }
}

interface AniManga {
  mal_id: number
  url: string
  images: Image
  title: string
}
