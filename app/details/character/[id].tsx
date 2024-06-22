import { getCharacterFullById } from "@/api/details/api"
import { FullCharacterResponse } from "@/api/details/types"
import StackHeader from "@/components/StackHeader"
import Wrapper from "@/components/Wrapper"
import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { Dimensions } from "react-native"
import { Text, View, Spinner, Image, YStack, ListItem, ScrollView, Button } from 'tamagui'

const CharacterDetailScreen = () => {
  const { id } = useLocalSearchParams()
  const query = useQuery<FullCharacterResponse>({
    queryKey: ['character-full', id],
    queryFn: () => getCharacterFullById(parseInt(id as string))
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

  let character = query.data!.data

  return (
    <Wrapper>
      <StackHeader title="Character" />
      <Image
        source={{ uri: character.images.jpg.image_url }}
        alt={character.name}
        width={130}
        height={180}
        marginTop={20}
        borderRadius={10}
        alignSelf="center"
      />
      <Text fontSize='$4' marginTop={10}>Name: <Text fontSize='$5' color='gray'>{character.name}</Text></Text>
      <Text fontSize='$4' marginVertical={5}>Kanji: <Text fontSize='$5' color='gray'>{character.name_kanji}</Text></Text>
      <Text fontSize='$4'>
        Favorites:
        <Text fontSize='$5' color='gray' alignItems="center">
          {character.favorites || '??'} <Ionicons name="heart" color='red' size={13} />
        </Text>
      </Text>
      <Text fontSize='$4' marginVertical={5}>
        Nicknames:
        <Text fontSize='$5' color='gray' alignItems="center">
          {' '}{character.nicknames.join(', ')}
        </Text>
      </Text>
      <Text fontSize='$4'>About: </Text>
      <ScrollView marginTop={5} height='$20'>
        <Text fontSize='$6' color='gray'>{character.about}</Text>
      </ScrollView>
    </Wrapper >
  )
}

export default CharacterDetailScreen
