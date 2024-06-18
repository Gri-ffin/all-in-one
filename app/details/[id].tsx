import { getAnimeDetails } from "@/api/details/api"
import { AnimeResponse } from "@/api/details/types"
import Wrapper from "@/components/Wrapper"
import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams, useNavigation } from "expo-router"
import { Spinner, Text, View, Image, XStack, Button, YStack, ScrollView } from "tamagui"
import config from '@/tamagui.config'
import { ExternalLink } from "@/components/ExternalLink"

const DetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const query = useQuery<AnimeResponse>({
    queryKey: ['anime-details', id],
    queryFn: () => getAnimeDetails(parseInt(id as string)),
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
      <XStack marginTop={30} borderWidth={0.3} borderRadius={20} width={309} marginHorizontal={-8}>
        <YStack borderRightWidth={0.3} width="32%" alignItems="center" paddingVertical={17} justifyContent="center">
          <Text fontSize='$3' textAlign="center">{query.data?.data.type}</Text>
          <Text fontSize='$6' color='gray'>Type</Text>
        </YStack>
        <YStack borderRightWidth={0.3} width='34%' alignItems="center" paddingVertical={17} justifyContent="center">
          <Text fontSize='$3' textAlign="center">{query.data?.data.source}</Text>
          <Text fontSize='$6' color='gray'>Source</Text>
        </YStack>
        <YStack width='34%' alignItems="center" paddingVertical={17} justifyContent="center">
          <Text fontSize='$3' textAlign="center">{query.data?.data.rating.split(' - ')[0]}</Text>
          <Text fontSize='$6' color='gray'>Rating</Text>
        </YStack>
      </XStack>
      <ScrollView marginTop={30} height='$20' contentContainerStyle={{ paddingBottom: 20 }}>
        <Text fontSize={12} lineHeight={20}>{query.data?.data.synopsis}</Text>
        <Button marginTop={15} color='white' bg={config.themes.secondary.gradient}>Add to favorites</Button>
      </ScrollView>
    </Wrapper>
  )
}

export default DetailsScreen
