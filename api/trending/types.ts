export interface MyAnimeListTrendingAnimeResponse {
  data: MyAnimeListTrendingAnime[]
}

interface MyAnimeListTrendingAnime {
  mal_id: number
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  title: string
  title_japanese: string
  title_english: string
  score: number
}
