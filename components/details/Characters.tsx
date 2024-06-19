import { getAnimeCharacters } from '@/api/details/api'
import { CharacterResponse } from '@/api/details/types'
import { useQuery } from '@tanstack/react-query'
import { View, Spinner, Text } from 'tamagui'
import Avatar from '../Avatar'

interface Props {
  id: number
}

const CharactersSection = ({ id }: Props) => {
  const query = useQuery<CharacterResponse>({
    queryKey: ['anime-characters', id],
    queryFn: () => getAnimeCharacters(id)
  })

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

  return (
    <View gap={20}>
      <Avatar
        source={{ uri: query.data!.data[0].character.images.jpg.image_url }}
        alt='Character'
      />
    </View>
  )
}

export default CharactersSection
