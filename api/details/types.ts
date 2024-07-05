import type { Anime, Character, Image, Manga } from "../types";

export interface AnimeResponse {
  data: Anime
}

export interface MangaResponse {
  data: Manga
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

export interface AniManga {
  mal_id: number
  url: string
  images: Image
  title: string
}

interface VoiceActor {
  mal_id: number
  url: string
  images: Image
  name: string
  given_name: string
  family_name: string
  alternate_names: string[]
  birthday: string
  favorites: number
  about: string
  anime: {
    position: string
    anime: AniManga
  }[]
  manga: {
    position: string
    manga: AniManga
  }[]
  voices: {
    role: string
    anime: AniManga
    character: Character
  }[]
}

export interface VoiceActorResponse {
  data: VoiceActor
}
