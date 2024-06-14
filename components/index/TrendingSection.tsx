import { getTrendingAnime } from '@/api/trending/api'
import { MyAnimeListTrendingAnimeResponse } from '@/api/trending/types'
import Trending from '@/components/trending'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Spinner, Text, View, XStack } from 'tamagui'

const TrendingSection = () => {
  // TODO: this should pass an api to switch between the providers
  const trendingQuery = useQuery<MyAnimeListTrendingAnimeResponse>({
    queryKey: ['trending'],
    queryFn: getTrendingAnime
  })

  let trendingSection = null

  if (trendingQuery.isLoading) {
    trendingSection = (
      <View justifyContent='center' alignItems='center'>
        <Spinner size='large' color='$blue10Light' />
      </View>
    )
  }

  if (trendingQuery.isError) {
    trendingSection = (
      <View justifyContent='center' alignItems='center'>
        <Text col='$red10Light' fontSize='$4'>
          {trendingQuery.error.message}
        </Text>
      </View>
    )
  }

  if (trendingQuery.isSuccess) {
    trendingSection = <Trending data={trendingQuery.data.data} />
  }

  return (
    <>
      <XStack alignItems='center' justifyContent='space-between' marginTop={17}>
        <Text fontSize='$4'>Trending Anime</Text>
        {/* TODO: should allow the ability to change between trending, favorties, etc.. */}
        <Button>
          <Ionicons size={28} name='ellipsis-horizontal' color='black' />
        </Button>
      </XStack>
      {trendingSection}
    </>
  )
}

export default TrendingSection
