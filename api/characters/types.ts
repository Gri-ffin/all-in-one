export interface MyAnimeListCharacterResponse {
  data: MyAnimeListCharacter[]
}

export interface MyAnimeListCharacter {
  mal_id: number
  url: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
    webp: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  name: string
  name_kanji: string
  nicknames: string[]
  favorites: number
  about: string
}
