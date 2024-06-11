import type { MyAnimeListTrendingAnime } from '@/api/trending/types'
import { ScrollView, XStack } from 'tamagui'
import Card from '../Card'

interface Props {
  data: MyAnimeListTrendingAnime[]
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
          <Card
            key={item.mal_id}
            imageSource={item.images.jpg.image_url}
            title={item.title}
            score={item.score}
          />
        ))}
      </XStack>
    </ScrollView>
  )
}

export default Trending
