import { getAnimeDetails } from "@/api/details/api"
import { AnimeResponse } from "@/api/details/types"
import Wrapper from "@/components/Wrapper"
import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams, useNavigation } from "expo-router"
import { Spinner, Text, View, Image, XStack, Button, YStack, Separator } from "tamagui"
import config from '@/tamagui.config'
import { ExternalLink } from "@/components/ExternalLink"
import { useState } from "react"
import SynopsisSection from "@/components/details/Synopsis"

type Tab = 'synopsis' | 'characters'

const DetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const query = useQuery<AnimeResponse>({
    queryKey: ['anime-details', id],
    queryFn: () => getAnimeDetails(parseInt(id as string)),
  })
  const [tab, setTab] = useState<Tab>('synopsis')

  const setSynopsisTab = () => {
    setTab('synopsis')
  }
  const setCharactersTab = () => {
    setTab('characters')
  }

  if (query.isLoading) {
    return (
      <View justifyContent='center' alignItems='center' height='100%'>
        <Spinner size='large' color='$blue10Light' />
      </View>
    )
  }

  if (query.isError) {
    return (
      <View justifyContent="center" alignItems="center" height='100%'>
        <Text color='$red10Light' fontSize='$3'>{query.error.message}</Text>
      </View>
    )
  }

  return (
    <Wrapper>
      <XStack alignItems="center" marginTop={-15} marginHorizontal={-15}>
        <Button onPress={() => navigation.goBack()}>
          <Ionicons size={28} name="arrow-back" />
        </Button>
        <Text textAlign="center" flex={0.8} fontSize='$5'>Details</Text>
      </XStack>
      <XStack marginTop={20}>
        <Image
          width={130}
          height={180}
          source={{ uri: query.data?.data.images.jpg.large_image_url }}
          borderRadius={15}
        />
        <YStack flexDirection="column" justifyContent="center" marginLeft={8} width={150}>
          <Text fontSize='$4'>{query.data?.data.title}</Text>
          <Text fontSize='$6' color='gray' marginVertical={6}>status: {query.data?.data.status}</Text>
          <Text fontSize='$6' color='gray' marginBottom={6}>rank: #{query.data?.data.popularity}</Text>
          <Text fontSize='$6' color='gray' marginBottom={6}>season: {query.data?.data.season || '??'}</Text>
          <Text fontSize='$6' color='gray' marginBottom={5}>studio: <ExternalLink style={{ color: 'blue' }} href={query.data!.data.studios[0].url}>{query.data?.data.studios[0].name}</ExternalLink></Text>
          <Text fontSize='$6' color='gray' lineHeight={20}>genres: {query.data?.data.genres.map(genre => genre.name).join(', ') || '??'}</Text>
        </YStack>
      </XStack>
      <XStack marginTop={30} borderWidth={0.3} borderRadius={15} marginHorizontal={-8} alignItems="center" justifyContent='space-evenly' paddingVertical={8}>
        <Text color={tab === 'synopsis' ? config.themes.secondary.gradient : 'gray'} onPress={setSynopsisTab}>Synopsis</Text>
        <Separator alignSelf="stretch" vertical marginHorizontal={15} />
        <Text color={tab === 'characters' ? config.themes.secondary.gradient : 'gray'} onPress={setCharactersTab}>Characters</Text>
      </XStack>
      <SynopsisSection query={query} />
    </Wrapper>
  )
}

export default DetailsScreen
