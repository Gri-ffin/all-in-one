import { getTopAnime } from '@/api/trending/api'
import type { AnimeResponse, Type } from '@/api/trending/types'
import Trending from '@/components/trending'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Button, Spinner, Text, View, XStack } from 'tamagui'
import Drawer from '../Drawer'
import { Item } from '../types'

const AnimeSection = () => {
  const [type, setType] = useState<Type>('airing')
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const query = useQuery<AnimeResponse>({
    queryKey: [type],
    queryFn: () => getTopAnime(type)
  })

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible)
  }
  const switchTopAiring = () => {
    setType('airing')
    toggleDrawer()
  }
  const switchTopFavorites = () => {
    setType('favorite')
    toggleDrawer()
  }
  const switchTopUpcoming = () => {
    setType('upcoming')
    toggleDrawer()
  }

  let animeSection = null

  if (query.isLoading) {
    animeSection = (
      <View justifyContent='center' alignItems='center'>
        <Spinner size='large' color='$blue10Light' />
      </View>
    )
  }

  if (query.isError) {
    animeSection = (
      <View justifyContent='center' alignItems='center'>
        <Text col='$red10Light' fontSize='$4'>
          {query.error.message}
        </Text>
      </View>
    )
  }

  if (query.isSuccess) {
    animeSection = <Trending data={query.data.data} />
  }

  const items: Item<Type>[] = [
    { name: 'airing', switch: switchTopAiring },
    { name: 'favorite', switch: switchTopFavorites },
    { name: 'upcoming', switch: switchTopUpcoming }
  ]

  return (
    <>
      <XStack alignItems='center' justifyContent='space-between' marginTop={17}>
        <Text fontSize='$4'>Top {type} anime</Text>
        <Button onPress={toggleDrawer}>
          <Ionicons size={28} name='ellipsis-horizontal' color='black' />
        </Button>
      </XStack>
      {isDrawerVisible && (
        <Drawer items={items} toggleDrawer={toggleDrawer} />
      )}
      {animeSection}
    </>
  )
}

export default AnimeSection

