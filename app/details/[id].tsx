import { getAnimeDetails } from '@/api/details/api'
import { AnimeResponse } from '@/api/details/types'
import Wrapper from '@/components/Wrapper'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import {
  Spinner,
  Text,
  View,
  Image,
  XStack,
  Button,
  YStack,
  Separator,
  ScrollView
} from 'tamagui'
import config from '@/tamagui.config'
import { ExternalLink } from '@/components/ExternalLink'
import { useState } from 'react'
import SynopsisSection from '@/components/details/Synopsis'
import CharactersSection from '@/components/details/Characters'
import YoutubePlayer from 'react-native-youtube-iframe'

type Tab = 'synopsis' | 'characters' | 'trailer'

const DetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const query = useQuery<AnimeResponse>({
    queryKey: ['anime-details', id],
    queryFn: () => getAnimeDetails(parseInt(id as string))
  })
  const [tab, setTab] = useState<Tab>('synopsis')

  const setSynopsisTab = () => {
    setTab('synopsis')
  }
  const setCharactersTab = () => {
    setTab('characters')
  }
  const setTrailerTab = () => {
    setTab('trailer')
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
      <View justifyContent='center' alignItems='center' height='100%'>
        <Text color='$red10Light' fontSize='$3'>
          {query.error.message}
        </Text>
      </View>
    )
  }

  console.log(query.data?.data.trailer.youtube_id)

  return (
    <Wrapper>
      <XStack alignItems='center' marginTop={-15} marginHorizontal={-15}>
        <Button onPress={() => navigation.goBack()}>
          <Ionicons size={28} name='arrow-back' />
        </Button>
        <Text textAlign='center' flex={0.8} fontSize='$5'>
          Details
        </Text>
      </XStack>
      <XStack marginTop={20}>
        <Image
          width={130}
          height={180}
          source={{ uri: query.data?.data.images.jpg.large_image_url }}
          borderRadius={15}
        />
        <YStack
          flexDirection='column'
          justifyContent='center'
          marginLeft={8}
          width={150}
        >
          <Text fontSize='$4'>{query.data?.data.title}</Text>
          <Text fontSize='$6' color='gray' marginVertical={6}>
            status: {query.data?.data.status}
          </Text>
          <Text fontSize='$6' color='gray' marginBottom={6}>
            rank: #{query.data?.data.popularity}
          </Text>
          <Text fontSize='$6' color='gray' marginBottom={6}>
            season: {query.data?.data.season || '??'}
          </Text>
          <Text fontSize='$6' color='gray' marginBottom={5}>
            studio:{' '}
            <ExternalLink
              style={{ color: 'blue' }}
              href={
                query.data?.data.studios && query.data?.data.studios[0] ? query.data.data.studios[0].url : ''
              }
            >
              {query.data?.data.studios &&
                query.data?.data.studios[0] ? query.data.data.studios[0].name
                : '??'
              }
            </ExternalLink>
          </Text>
          <Text fontSize='$6' color='gray' lineHeight={20}>
            genres:{' '}
            {query.data?.data.genres && query.data?.data.genres.map(genre => genre.name).join(', ') ||
              '??'}
          </Text>
        </YStack>
      </XStack>

      <XStack
        marginTop={30}
        borderWidth={0.3}
        borderRadius={15}
        alignItems='center'
        justifyContent='center'
        paddingVertical={8}
        width='100%'
      >
        <Text
          color={tab === 'synopsis' ? config.themes.secondary.gradient : 'gray'}
          onPress={setSynopsisTab}
        >
          Synopsis
        </Text>
        <Separator alignSelf='stretch' vertical marginHorizontal={15} />
        <Text
          color={
            tab === 'characters' ? config.themes.secondary.gradient : 'gray'
          }
          onPress={setCharactersTab}
        >
          Characters
        </Text>
        <Separator alignSelf='stretch' vertical marginHorizontal={15} />
        <Text
          color={
            tab === 'trailer' ? config.themes.secondary.gradient : 'gray'
          }
          onPress={setTrailerTab}
        >
          Trailer
        </Text>
      </XStack>
      {tab === 'synopsis' && <SynopsisSection query={query} />}
      {tab === 'characters' && (
        <CharactersSection id={parseInt(id as string)} />
      )}
      {tab === 'trailer' && (
        query.data?.data.trailer.youtube_id ? (
          <View marginTop={20}>
            <YoutubePlayer
              height={170}
              play={false}
              videoId={query.data.data.trailer.youtube_id}
              mute={false}
            />
          </View>
        ) : (
          <Text fontSize='$4' marginTop={35}>No trailer available.</Text>
        ))
      }
    </Wrapper>
  )
}

export default DetailsScreen
