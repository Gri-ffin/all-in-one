import type { AniManga } from "@/api/details/types";
import { ScrollView, YStack, Text, XStack, Button } from "tamagui";
import Avatar from "@/components/Avatar";
import { Link } from "expo-router";
import { useState } from "react";
import config from "@/tamagui.config";


interface Props {
  data: AniManga[]
}

const AniMangaSection = ({ data }: Props) => {
  const [visibleCount, setVisibleCount] = useState<number>(10)

  let dataSection = null

  const loadMoreCharacters = () => {
    setVisibleCount(prevCount => prevCount + 10)
  }

  data = data || []
  const displayData = data.slice(0, visibleCount)

  if (data.length === 0) {
    dataSection = <Text fontSize='$4' marginTop={35}>No anime data available.</Text>
  } else {
    dataSection = displayData.map(a => (
      <Link asChild key={a.mal_id} href={`/details/${a.mal_id}`}>
        <XStack alignItems="center">
          <Avatar source={{ uri: a.images.jpg.image_url }} alt={a.title} />
          <Text width={220} fontSize='$5' marginLeft={5}>{a.title}</Text>
        </XStack>
      </Link>
    ))
  }

  return (
    <ScrollView height={400} marginTop={20}>
      <YStack gap={20} marginBottom={20}>
        {dataSection}
        {visibleCount < data.length && (
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

export default AniMangaSection
