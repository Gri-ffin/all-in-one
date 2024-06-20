import type { Anime, Character } from "../types";

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
