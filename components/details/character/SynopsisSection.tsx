import type { FullCharacterResponse } from "@/api/details/types"
import { Ionicons } from "@expo/vector-icons"
import { Text, ScrollView } from 'tamagui'

interface Props {
  character: FullCharacterResponse['data']
}

const SynopsisSection = ({ character }: Props) => {
  return (
    <>
      <Text fontSize='$4' marginTop={10}>Name: <Text fontSize='$5' color='gray'>{character.name}</Text></Text>
      <Text fontSize='$4' marginVertical={5}>Kanji: <Text fontSize='$5' color='gray'>{character.name_kanji}</Text></Text>
      <Text fontSize='$4'>
        Favorites:
        <Text fontSize='$5' color='gray' alignItems="center">
          {character.favorites || ' ??'} <Ionicons name="heart" color='red' size={13} />
        </Text>
      </Text>
      <Text fontSize='$4' marginVertical={5}>
        Nicknames:
        <Text fontSize='$5' color='gray' alignItems="center">
          {' '}{character.nicknames.join(', ')}
        </Text>
      </Text>
      <Text fontSize='$4'>About: </Text>
      <ScrollView marginTop={5} contentContainerStyle={{ paddingBottom: 400 }}>
        <Text fontSize={12} minHeight='$20' lineHeight={20} color='gray'>{character.about || 'No description available.'}</Text>
      </ScrollView>
    </>
  )
}

export default SynopsisSection
