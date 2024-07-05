import { getTopManga } from '@/api/trending/api'
import { MangaResponse, MangaTopType } from '@/api/trending/types'
import Drawer from '@/components/Drawer'
import Header from '@/components/Header'
import MangaCard from '@/components/MangaCard'
import Wrapper from '@/components/Wrapper'
import { Item } from '@/components/types'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Input, XStack, Text, Button, View, Spinner, ScrollView } from 'tamagui'

export default function MangaScreen() {
  const [type, setType] = useState<MangaTopType>('publishing')
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const query = useQuery<MangaResponse>({
    queryKey: ['top-manga', type],
    queryFn: () => getTopManga(type)
  })
  const router = useRouter()
  const [input, setInput] = useState<string>('')

  const onPressSearchManga = (input: string) => {
    router.navigate(`/search/manga/${input}`)
  }
  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible)
  }

  const switchTopPublishing = () => {
    setType('publishing')
    toggleDrawer()
  }
  const switchTopFavorites = () => {
    setType('favorite')
    toggleDrawer()
  }

  let trendingSection = null

  if (query.isLoading) {
    trendingSection = (
      <View justifyContent='center' alignItems='center'>
        <Spinner size='large' color='$blue10Light' />
      </View>
    )
  }

  if (query.isError) {
    trendingSection = (
      <View justifyContent='center' alignItems='center'>
        <Text col='$red10Light' fontSize='$4'>
          {query.error.message}
        </Text>
      </View>
    )
  }

  if (query.isSuccess) {
    trendingSection = (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View gap={30}>
          {query.data.data.map(manga => (
            <MangaCard
              title={manga.title}
              image_source={manga.images.jpg.image_url}
              popularity={manga.popularity}
              score={manga.score}
              from={manga.published.from}
              key={manga.mal_id}
              id={manga.mal_id}
            />
          ))}
        </View>
      </ScrollView>
    )
  }

  const items: Item<MangaTopType>[] = [
    { name: 'publishing', switch: switchTopPublishing },
    { name: 'favorite', switch: switchTopFavorites },
  ]

  return (
    <Wrapper>
      <Header />
      <Input placeholder='Search manga' marginTop={22} onChangeText={setInput} onSubmitEditing={() => onPressSearchManga(input)} />
      <XStack alignItems='center' justifyContent='space-between' marginTop={17}>
        <Text fontSize='$4'>Top {type} manga</Text>
        <Button onPress={toggleDrawer}>
          <Ionicons size={28} name='ellipsis-horizontal' color='black' />
        </Button>
      </XStack>
      {isDrawerVisible && (
        <Drawer items={items} toggleDrawer={toggleDrawer} />
      )}
      {trendingSection}
    </Wrapper>
  )
}
