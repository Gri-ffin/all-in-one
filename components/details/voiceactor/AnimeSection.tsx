import type { VoiceActorResponse } from "@/api/details/types";
import { ScrollView, YStack, Text, XStack, Button } from "tamagui";
import Avatar from "@/components/Avatar";
import { Link } from "expo-router";
import { useState } from "react";
import config from "@/tamagui.config";

interface Props {
  data: VoiceActorResponse['data']
}

const AnimeSection = ({ data }: Props) => {
  const [visibleCount, setVisibleCount] = useState<number>(10)

  let animeSection = null

  const loadMoreCharacters = () => {
    setVisibleCount(prevCount => prevCount + 10)
  }

  const animeData = data.anime || []
  const displayAnime = animeData.slice(0, visibleCount)

  if (animeData.length === 0) {
    animeSection = <Text fontSize='$4' marginTop={35}>No anime data available.</Text>
  } else {
    animeSection = displayAnime.map(a => (
      <Link asChild key={a.anime.mal_id} href={`/details/${a.anime.mal_id}`}>
        <XStack alignItems="center">
          <Avatar source={{ uri: a.anime.images.jpg.image_url }} alt={a.anime.title} />
          <Text width={220} fontSize='$5' marginLeft={5}>{a.anime.title}</Text>
        </XStack>
      </Link>
    ))
  }

  return (
    <ScrollView height={400} marginTop={20}>
      <YStack gap={20} marginBottom={20}>
        {animeSection}
        {visibleCount < animeData.length && (
          <Button
            onPress={loadMoreCharacters}
            backgroundColor={config.themes.secondary.gradient}
            borderRadius={10}
            marginVertical={15}
            color='white'
          >
            Load More
          </Button>
        )}
      </YStack>
    </ScrollView>
  )
}

export default AnimeSection
