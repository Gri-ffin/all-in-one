import { getRandomAnime } from '@/api/random/api'
import type { RandomAnimeResponse } from '@/api/random/types'
import { useQuery } from '@tanstack/react-query'
import { Spinner, Text, View, XStack } from 'tamagui'
import Avatar from '../Avatar'
import config from '@/tamagui.config'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'

const RandomSection = () => {
  const randomAnimeQuery = useQuery<RandomAnimeResponse>({
    queryKey: ['randomAnime'],
    queryFn: getRandomAnime
  })

  if (randomAnimeQuery.isLoading) {
    return (
      <View justifyContent='center' alignItems='center'>
        <Spinner size='large' color='$blue10Light' />
      </View>
    )
  }

  if (randomAnimeQuery.isError) {
    return (
      <View justifyContent='center' alignItems='center'>
        <Text>{randomAnimeQuery.error.message}</Text>
      </View>
    )
  }

  return (
    <Link href='/details' asChild>
      <XStack
        alignItems='center'
        justifyContent='center'
        marginVertical={15}
        backgroundColor={config.themes.secondary.gradient}
        paddingVertical={5}
        borderRadius={60}
      >
        <Avatar
          source={{
            uri: randomAnimeQuery.data!.data.images.jpg.image_url
          }}
          width={50}
          height={50}
        />
        <Text
          fontSize='$6'
          maxWidth={200}
          numberOfLines={1}
          overflow='hidden'
          textOverflow='ellipsis'
          marginLeft={6}
          color='white'
        >
          {randomAnimeQuery.data!.data.title}
        </Text>
      </XStack>
    </Link>
  )
}

export default RandomSection

const styles = StyleSheet.create({
  link: {
    width: '100%'
  }
})
