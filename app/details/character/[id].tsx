import { getCharacterFullById } from "@/api/details/api"
import { FullCharacterResponse } from "@/api/details/types"
import StackHeader from "@/components/StackHeader"
import Wrapper from "@/components/Wrapper"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Text, View, Spinner, Image, Separator, XStack } from 'tamagui'
import config from '@/tamagui.config'
import SynopsisSection from "@/components/details/character/SynopsisSection"
import AnimeSection from "@/components/details/character/AnimeSection"
import VoiceActors from "@/components/details/character/VoiceActors"

type Tab = 'synopsis' | 'anime' | 'voiceactors'

const CharacterDetailScreen = () => {
  const [tab, setTab] = useState<Tab>('synopsis')
  const { id } = useLocalSearchParams()
  const query = useQuery<FullCharacterResponse>({
    queryKey: ['character-full', id],
    queryFn: () => getCharacterFullById(parseInt(id as string))
  })

  const setSynopsisTab = () => {
    setTab('synopsis')
  }
  const setAnimeTab = () => {
    setTab('anime')
  }
  const setVoiceActorsTab = () => {
    setTab('voiceactors')
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
            tab === 'anime' ? config.themes.secondary.gradient : 'gray'
          }
          onPress={setAnimeTab}
        >
          Anime
        </Text>
        <Separator alignSelf='stretch' vertical marginHorizontal={15} />
        <Text
          color={
            tab === 'voiceactors' ? config.themes.secondary.gradient : 'gray'
          }
          onPress={setVoiceActorsTab}
        >
          Voice actors
        </Text>
      </XStack>
      {tab === 'synopsis' && <SynopsisSection character={character} />}
      {tab === 'anime' && <AnimeSection character={character} />}
      {tab === 'voiceactors' && <VoiceActors character={character} />}
    </Wrapper >
  )
}

export default CharacterDetailScreen
