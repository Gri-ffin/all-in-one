import { getAnimeCharacters } from '@/api/details/api'
import { CharacterResponse } from '@/api/details/types'
import { useQuery } from '@tanstack/react-query'
import { View, Spinner, Text, XStack, YStack, ScrollView } from 'tamagui'
import Avatar from '../Avatar'
import { Character } from '@/api/types'
import { Link } from 'expo-router'
import CharacterCard from '../CharacterCard'

interface Props {
  id: number
}

const CharactersSection = ({ id }: Props) => {
  const query = useQuery<CharacterResponse>({
    queryKey: ['anime-characters', id],
    queryFn: () => getAnimeCharacters(id)
  })

  let characterSection = null

  if (query.isLoading) {
    return (
      <View justifyContent='center' alignItems='center' height='100%'>
        <Spinner size='large' color='$blue10Light' />
      </View>
    )
  }

  if (query.isError) {
    return (
      <View justifyContent='center' alignItems='center' height='100%'>
        <Text color='$red10Light' fontSize='$3'>
          {query.error.message}
        </Text>
      </View>
    )
  }

  if (query.data!.data.length > 10) {
    characterSection = query.data?.data.slice(0, 10).map(character => (
      <CharacterCard data={character} key={character.character.mal_id} id={character.character.mal_id} />
    ))
  } else if (query.data?.data.length === 0) {
    characterSection = <Text fontSize='$4' marginTop={35}>No character data available.</Text>
  } else {
    characterSection = query.data?.data.map(character => (
      <CharacterCard data={character} key={character.character.mal_id} id={character.character.mal_id} />
    ))

  }



  return (
    <ScrollView marginBottom={60}>
      {characterSection}
    </ScrollView>
  )
}

export default CharactersSection

