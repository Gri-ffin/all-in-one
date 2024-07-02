import { Character } from "@/api/types";
import { Link } from "expo-router";
import { XStack, YStack, Text } from "tamagui";
import Avatar from "./Avatar";

interface Props {
  data: {
    character: Character;
    role: string;
  }
  id: number
}

const CharacterCard = ({ data, id }: Props) => {
  return (
    <Link href={`/details/character/${id}`} asChild>
      <XStack alignItems='center' gap={15} marginTop={35} justifyContent='space-between'>
        <XStack alignItems='center' gap={15}>
          <Avatar
            source={{ uri: data.character.images.jpg.image_url }}
            alt='Character'
          />
          <YStack>
            <Text>{data.character.name}</Text>
            <Text fontSize='$6' color='gray'>{data.role}</Text>
          </YStack>
        </XStack>
      </XStack>
    </Link>
  )
}

export default CharacterCard
