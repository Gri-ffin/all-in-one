import { getVoiceActor } from "@/api/details/api"
import { VoiceActorResponse } from "@/api/details/types"
import StackHeader from "@/components/StackHeader"
import Wrapper from "@/components/Wrapper"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { View, Text, Spinner, Image } from "tamagui"
import Tabs from '@/components/Tabs'
import { useState } from "react"
import SynopsisSection from "@/components/details/voiceactor/SynopsisSection"
import AnimeSection from "@/components/details/voiceactor/AnimeSection"
import MangaSection from "@/components/details/voiceactor/MangaSection"


const VoiceActorScreen = () => {
  const { id } = useLocalSearchParams()
  const query = useQuery<VoiceActorResponse>({
    queryKey: ['voice-actor', id],
    queryFn: () => getVoiceActor(parseInt(id as string))
  })
  const [activeTab, setActiveTab] = useState<string>('synopsis')

  const tabs = [
    { key: 'synopsis', label: 'Synopsis' },
    { key: 'anime', label: 'Anime' },
    { key: 'manga', label: 'Manga' },
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

  let voiceActor = query.data!.data

  return (
    <Wrapper>
      <StackHeader title="Voice actor" />
      <Image
        source={{ uri: voiceActor.images.jpg.image_url }}
        alt={voiceActor.name}
        width={130}
        height={180}
        marginTop={20}
        borderRadius={10}
        alignSelf="center"
      />
      <Tabs tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'synopsis' && <SynopsisSection data={voiceActor} />}
      {activeTab === 'anime' && <AnimeSection data={voiceActor} />}
      {activeTab === 'manga' && <MangaSection data={voiceActor} />}
    </Wrapper>
  )
}

export default VoiceActorScreen
