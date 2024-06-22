export interface Anime {
  mal_id: number
  url: string
  images: Image
  trailer: {
    youtube_id: string
    url: string
    embed_url: string
  }
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  type: string
  source: string
  episodes: number
  status: string
  airing: boolean
  aired: {
    from: string
    to: string
  }
  duration: string
  rating?: string
  score: number
  scored_by: number
  rank: string
  popularity: number
  members: number
  favorites: number
  synopsis: string
  backgroud: string
  season?: string
  year: number
  genres: Genre[]
  studios?: Studio[]
}

export interface Manga {
  mal_id: number
  url: string
  images: Image
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  type: string
  volumes: number
  chapters: number
  status: string
  publishing: boolean
  published: {
    from: string
    to?: string
  }
  score: number
  scored_by: number
  rank: string
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  genres: Genre[]
}

interface Genre {
  mal_id: number
  type: string
  name: string
  url: string
}
interface Title {
  type: string
  title: string
}

interface Studio {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Image {
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

export interface Character {
  mal_id: number
  url: string
  images: Image
  name: string
}
