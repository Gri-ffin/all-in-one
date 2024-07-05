import { getCharacterFullById } from "@/api/details/api"
import { FullCharacterResponse } from "@/api/details/types"
import StackHeader from "@/components/StackHeader"
import Wrapper from "@/components/Wrapper"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Text, View, Spinner, Image } from 'tamagui'
import SynopsisSection from "@/components/details/character/SynopsisSection"
import AniMangaSection from "@/components/details/character/AniMangaSection"
import VoiceActors from "@/components/details/character/VoiceActors"
import Tabs from '@/components/Tabs'

const CharacterDetailScreen = () => {
  const [activeTab, setActiveTab] = useState<string>('synopsis')
  const { id } = useLocalSearchParams()
  const query = useQuery<FullCharacterResponse>({
    queryKey: ['character-full', id],
    queryFn: () => getCharacterFullById(parseInt(id as string))
  })

  const tabs = [
    { key: 'synopsis', label: 'Synopsis' },
    { key: 'anime', label: 'Anime' },
    { key: 'manga', label: 'Manga' },
    { key: 'voiceactors', label: 'Voice' }
  ]

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
      <Tabs tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'synopsis' && <SynopsisSection character={character} />}
      {activeTab === 'anime' && <AniMangaSection data={character.anime.map(item => item.anime)} />}
      {activeTab === 'manga' && <AniMangaSection data={character.manga.map(item => item.manga)} />}
      {activeTab === 'voiceactors' && <VoiceActors character={character} />}
    </Wrapper>
  )
}

export default CharacterDetailScreen
