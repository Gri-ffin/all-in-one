import { ScrollView, XStack } from 'tamagui'
import AnimeCard from '../AnimeCard'
import type { Anime } from '@/api/types'

interface Props {
  data: Anime[]
}

const Trending = ({ data }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <XStack gap={20}>
        {data.map(item => (
          <AnimeCard
            key={item.mal_id}
            imageSource={item.images.jpg.image_url}
            title={item.title}
            score={item.score}
            id={item.mal_id}
          />
        ))}
      </XStack>
    </ScrollView>
  )
}

export default Trending
