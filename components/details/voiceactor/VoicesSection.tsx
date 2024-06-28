import type { VoiceActorResponse } from "@/api/details/types";
import { ScrollView, YStack, Text, XStack, Button } from "tamagui";
import Avatar from "@/components/Avatar";
import { Link } from "expo-router";
import { useState } from "react";
import config from "@/tamagui.config";

interface Props {
  data: VoiceActorResponse['data']
}

const VoicesSection = ({ data }: Props) => {
  const [visibleCount, setVisibleCount] = useState<number>(10)

  let voicesSection = null

  const loadMoreCharacters = () => {
    setVisibleCount(prevCount => prevCount + 10)
  }

  const voicesData = data.voices || []
  const displayVoices = voicesData.slice(0, visibleCount)

  if (voicesData.length === 0) {
    voicesSection = <Text fontSize='$4' marginTop={35}>No voice data available.</Text>
  } else {
    voicesSection = displayVoices.map(a => (
      <Link href={`/details/character/${a.character.mal_id}`} key={a.character.mal_id}>
        <XStack alignItems="center">
          <Avatar source={{ uri: a.character.images.jpg.image_url }} alt={a.character.name} />
          <YStack>
            <Text width={220} fontSize='$5' marginLeft={5}>{a.character.name}</Text>
            <Text width={220} fontSize='$6' color='gray' marginLeft={5}>{a.role}</Text>
          </YStack>
        </XStack>
      </Link>
    ))
  }

  return (
    <ScrollView height={400} marginTop={20}>
      <YStack gap={20} marginBottom={20}>
        {voicesSection}
        {visibleCount < voicesData.length && (
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

export default VoicesSection 
