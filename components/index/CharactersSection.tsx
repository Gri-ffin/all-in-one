import { getTopCharacters } from '@/api/characters/api'
import type { MyAnimeListCharacterResponse } from '@/api/characters/types'
import { useQuery } from '@tanstack/react-query'
import { ScrollView, Spinner, Text, View, XStack } from 'tamagui'
import Avatar from '../Avatar'
import { Link } from 'expo-router'

const CharactersSection = () => {
  const topCharactersQuery = useQuery<MyAnimeListCharacterResponse>({
    queryKey: ['topCharacters'],
    queryFn: getTopCharacters
  })

  if (topCharactersQuery.isLoading) {
    return (
      <View justifyContent='center' alignItems='center'>
        <Spinner size='large' color='$blue10Light' />
      </View>
    )
  }

  if (topCharactersQuery.isError) {
    return (
      <View justifyContent='center' alignItems='center'>
        <Text>{topCharactersQuery.error.message}</Text>
      </View>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <XStack gap={33} paddingHorizontal={5}>
        {topCharactersQuery.data!.data.map(character => (
          <Link href={`/details/character/${character.mal_id}`} asChild key={character.mal_id}>
            <View
              key={character.mal_id}
              width={50}
              display='flex'
              flexDirection='column'
              alignItems='center'
              marginTop={18}
            >
              <Avatar
                source={{ uri: character.images.jpg.image_url }}
                alt={character.name}
              />
              <Text
                fontSize='$6'
                textAlign='center'
                overflow='hidden'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                numberOfLines={1}
              >
                {character.name}
              </Text>
            </View>
          </Link>
        ))}
      </XStack>
    </ScrollView>
  )
}

export default CharactersSection
