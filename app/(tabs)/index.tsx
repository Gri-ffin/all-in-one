import Avatar from '@/components/Avatar'
import config from '@/tamagui.config'
import { Text, View, styled } from '@tamagui/core'
import { useQuery } from '@tanstack/react-query'
import { Input, ScrollView, Spinner, XStack, YStack } from 'tamagui'
import { MyAnimeListCharacterResponse } from '@/api/characters/types'
import { getTopCharacters } from '@/api/characters/api'
import Header from '@/tabs/index/Header'
import TrendingSection from '@/tabs/index/TrendingSection'

export default function AnimeScreen() {
  const topCharactersQuery = useQuery<MyAnimeListCharacterResponse>({
    queryKey: ['topCharacters'],
    queryFn: getTopCharacters
  })

  let topCharactersSection = null

  if (topCharactersQuery.isLoading) {
    topCharactersSection = (
      <View justifyContent='center' alignItems='center'>
        <Spinner size='large' color='white' />
      </View>
    )
  }

  if (topCharactersQuery.isError) {
    topCharactersSection = (
      <View justifyContent='center' alignItems='center'>
        <Text>{topCharactersQuery.error.message}</Text>
      </View>
    )
  }

  if (topCharactersQuery.isSuccess) {
    topCharactersSection = (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        <XStack gap={33}>
          {topCharactersQuery.data.data.map(character => (
            <View
              key={character.mal_id}
              width={50}
              display='flex'
              flexDirection='column'
              alignItems='center'
              marginTop={18}
            >
              <Avatar
                source={{ uri: character.images.jpg.image_url }}
                alt={character.name}
              />
              <Text
                fontSize='$6'
                color='white'
                textAlign='center'
                overflow='hidden'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                numberOfLines={1}
              >
                {character.name}
              </Text>
            </View>
          ))}
        </XStack>
      </ScrollView>
    )
  }
  return (
    <View marginHorizontal={33} marginVertical={58}>
      <Header />
      <Input placeholder='Search manga or anime' marginTop={22} />
      <TrendingSection />
      <View
        marginTop={12}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={config.themes.secondary.gradient}
        marginHorizontal={-33}
      >
        <View marginTop={25} marginHorizontal={33} height={300}>
          <Text fontSize='$4' color='white'>
            Top characters
          </Text>
          {topCharactersSection}
        </View>
      </View>
    </View>
  )
}
