import type { VoiceActorResponse } from "@/api/details/types";
import { ScrollView, YStack, Text, XStack, Button } from "tamagui";
import Avatar from "@/components/Avatar";
import { Link } from "expo-router";
import { useState } from "react";
import config from "@/tamagui.config";

interface Props {
  data: VoiceActorResponse['data']
}

const MangaSection = ({ data }: Props) => {
  const [visibleCount, setVisibleCount] = useState<number>(10)

  let mangaSection = null

  const loadMoreCharacters = () => {
    setVisibleCount(prevCount => prevCount + 10)
  }

  const mangaData = data.manga || []
  const displayManga = mangaData.slice(0, visibleCount)

  if (mangaData.length === 0) {
    mangaSection = <Text fontSize='$4' marginTop={35}>No manga data available.</Text>
  } else {
    mangaSection = displayManga.map(a => (
      <Link asChild key={a.manga.mal_id} href={`/details/manga/${a.manga.mal_id}`}>
        <XStack alignItems="center">
          <Avatar source={{ uri: a.manga.images.jpg.image_url }} alt={a.manga.title} />
          <Text width={220} fontSize='$5' marginLeft={5}>{a.manga.title}</Text>
        </XStack>
      </Link>
    ))
  }

  return (
    <ScrollView height={400} marginTop={20}>
      <YStack gap={20} marginBottom={20}>
        {mangaSection}
        {visibleCount < mangaData.length && (
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

export default MangaSection
