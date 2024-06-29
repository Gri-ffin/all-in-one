import { getAnimeDetails } from '@/api/details/api'
import { AnimeResponse } from '@/api/details/types'
import Wrapper from '@/components/Wrapper'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { Spinner, Text, View, } from 'tamagui'
import { useState } from 'react'
import SynopsisSection from '@/components/details/Synopsis'
import CharactersSection from '@/components/details/Characters'
import StackHeader from '@/components/StackHeader'
import AnimeInfo from '@/components/details/AnimeInfo'
import Tabs from '@/components/Tabs'
import VideoPlayer from '@/components/VideoPlayer'

const DetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const query = useQuery<AnimeResponse>({
    queryKey: ['anime-details', id],
    queryFn: () => getAnimeDetails(parseInt(id as string))
  })
  const [activeTab, setActiveTab] = useState('synopsis')

  const tabs = [
    { key: 'synopsis', label: 'Synopsis' },
    { key: 'characters', label: 'Characters' },
    { key: 'trailer', label: 'Trailer' },
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

  return (
    <Wrapper>
      <StackHeader title='Details' />
      <AnimeInfo data={query.data!.data} />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'synopsis' && <SynopsisSection query={query} />}
      {activeTab === 'characters' && (
        <CharactersSection id={parseInt(id as string)} />
      )}
      {activeTab === 'trailer' && (
        query.data?.data.trailer.youtube_id ? (
          <VideoPlayer youtubeId={query.data.data.trailer.youtube_id} />
        ) : (
          <Text fontSize='$4' marginTop={35}>No trailer available.</Text>
        ))
      }
    </Wrapper>
  )
}

export default DetailsScreen
