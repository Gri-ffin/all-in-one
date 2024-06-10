import { getTrendingAnime } from '@/api/trending/api'
import Avatar from '@/components/Avatar'
import Card from '@/components/Card'
import config from '@/tamagui.config'
import { Ionicons } from '@expo/vector-icons'
import { Text, View, styled } from '@tamagui/core'
import { useQuery } from '@tanstack/react-query'
import { Button, Input, Spinner, XStack, YStack } from 'tamagui'
import type { MyAnimeListTrendingAnimeResponse } from '@/api/trending/types'

const SecondaryText = styled(Text, {
  color: config.themes.secondary.gray,
  fontSize: 12
})

export default function HomeScreen() {
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

  if (trendingQuery.isSuccess) {
    trendingSection = (
      <View>
        <Card
          imageSource={trendingQuery.data.data[1].images.jpg.image_url}
          title={trendingQuery.data.data[1].title}
          score={trendingQuery.data.data[1].score}
        />
      </View>
    )
  }
  return (
    <View marginHorizontal={33} marginVertical={58}>
      <XStack alignItems='center' justifyContent='space-between'>
        {/* TODO: the source of the image should be updated to the user pfp, the same can be said to the lable */}
        <XStack>
          <Avatar
            source={{ uri: 'https://i.pravatar.cc/300' }}
            alt='Illia Frunza'
          />
          <YStack
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            marginLeft={10}
          >
            <SecondaryText>Stay trending!</SecondaryText>
            {/* TODO: add the username of the user */}
            <Text fontSize='$5'>Illia Frunza</Text>
          </YStack>
        </XStack>
        {/* TODO: should allow the ability to change the provider (eg. myanimelist, anilist...) */}
        <Button>
          <Ionicons size={28} name='settings-outline' color='black' />
        </Button>
      </XStack>
      <Input placeholder='Search manga or anime' marginTop={22} />
      <XStack alignItems='center' justifyContent='space-between' marginTop={17}>
        <Text fontSize='$4'>Trending Anime</Text>
        {/* TODO: should allow the ability to change between anime and manga */}
        <Button>
          <Ionicons size={28} name='ellipsis-horizontal' color='black' />
        </Button>
      </XStack>
      {/* TODO: add the list of trending anime */}
      {trendingSection}
    </View>
  )
}
