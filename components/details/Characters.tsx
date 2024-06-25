import { getAnimeCharacters } from '@/api/details/api'
import { CharacterResponse } from '@/api/details/types'
import { useQuery } from '@tanstack/react-query'
import { View, Spinner, Text, ScrollView, Button } from 'tamagui'
import CharacterCard from '../CharacterCard'
import { useState } from 'react'
import config from '@/tamagui.config'

interface Props {
  id: number
}

const CharactersSection = ({ id }: Props) => {
  const query = useQuery<CharacterResponse>({
    queryKey: ['anime-characters', id],
    queryFn: () => getAnimeCharacters(id)
  })
  const [visibleCount, setVisibleCount] = useState<number>(10)

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

  const loadMoreCharacters = () => {
    setVisibleCount(prevCount => prevCount + 10)
  }

  const characterData = query.data?.data || []
  const displayCharacters = characterData.slice(0, visibleCount)

  if (characterData.length === 0) {
    characterSection = <Text fontSize='$4' marginTop={35}>No character data available.</Text>
  } else {
    characterSection = displayCharacters.map(character => (
      <CharacterCard data={character} key={character.character.mal_id} id={character.character.mal_id} />
    ))
  }

  return (
    <ScrollView height={400}>
      {characterSection}
      {visibleCount < characterData.length && (
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
    </ScrollView>
  )
}

export default CharactersSection

