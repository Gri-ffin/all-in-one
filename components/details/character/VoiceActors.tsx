import type { FullCharacterResponse } from "@/api/details/types"
import { ScrollView, YStack, XStack, Text } from "tamagui"
import Avatar from "@/components/Avatar"
import { Link } from "expo-router"

interface Props {
  character: FullCharacterResponse['data']
}

const VoiceActors = ({ character }: Props) => {
  return (
    <ScrollView height={400} marginTop={20}>
      <YStack gap={20} marginBottom={20}>
        {character.voices.map(a => (
          <Link href={`/details/voiceactor/${a.person.mal_id}`} key={a.person.mal_id}>
            <XStack >
              <Avatar source={{ uri: a.person.images.jpg.image_url }} alt={a.person.name} />
              <YStack justifyContent="center">
                <Text width={220} fontSize='$5' marginLeft={5}>{a.person.name}</Text>
                <Text width={220} fontSize='$6' color='gray' marginLeft={5}>{a.language}</Text>
              </YStack>
            </XStack>
          </Link>
        ))}
      </YStack>
    </ScrollView>
  )
}

export default VoiceActors
