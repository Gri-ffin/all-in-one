import { getMangaDetails } from '@/api/details/api'
import { MangaResponse } from '@/api/details/types'
import Wrapper from '@/components/Wrapper'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { Spinner, Text, View, } from 'tamagui'
import { useState } from 'react'
import SynopsisSection from '@/components/details/manga/Synopsis'
import CharactersSection from '@/components/details/Characters'
import StackHeader from '@/components/StackHeader'
import Tabs from '@/components/Tabs'
import MangaInfo from '@/components/details/MangaInfo'

const DetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const query = useQuery<MangaResponse>({
    queryKey: ['manga-details', id],
    queryFn: () => getMangaDetails(parseInt(id as string))
  })
  const [activeTab, setActiveTab] = useState('synopsis')

  const tabs = [
    { key: 'synopsis', label: 'Synopsis' },
    { key: 'characters', label: 'Characters' },
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
      <MangaInfo data={query.data!.data} />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'synopsis' && <SynopsisSection query={query} />}
      {activeTab === 'characters' && (
        <CharactersSection id={parseInt(id as string)} type='manga' />
      )}
    </Wrapper>
  )
}

export default DetailsScreen
