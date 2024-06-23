import { FullCharacterResponse } from "@/api/details/types";
import { ScrollView, YStack, Text, XStack } from "tamagui";
import Avatar from "@/components/Avatar";
import { Link } from "expo-router";

interface Props {
  character: FullCharacterResponse['data']
}

const AnimeSection = ({ character }: Props) => {
  return (
    <ScrollView height={400} marginTop={20}>
      <YStack gap={20} marginBottom={20}>
        {character.anime.map(a => (
          <Link asChild key={a.anime.mal_id} href={`/details/${a.anime.mal_id}`}>
            <XStack>
              <Avatar source={{ uri: a.anime.images.jpg.image_url }} alt={a.anime.title} />
              <Text width={220} fontSize='$5' marginLeft={5}>{a.anime.title}</Text>
            </XStack>
          </Link>
        ))}
      </YStack>
    </ScrollView>
  )
}

export default AnimeSection
