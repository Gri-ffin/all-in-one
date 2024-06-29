import { Text, View } from '@tamagui/core'
import { Input } from 'tamagui'
import TrendingSection from '@/components/index/TrendingSection'
import Header from '@/components/Header'
import CharactersSection from '@/components/index/CharactersSection'
import RandomSection from '@/components/index/RandomSection'
import Wrapper from '@/components/Wrapper'
import { useState } from 'react'
import { useRouter } from 'expo-router'

export default function AnimeScreen() {
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const onPressSearchAnime = (input: string) => {
    router.navigate(`/search/anime/${input}`)
  }

  return (
    <Wrapper>
      <Header />
      <Input placeholder='Search anime' marginTop={22} onChangeText={setInput} onSubmitEditing={() => onPressSearchAnime(input)} />
      <TrendingSection />
      <View marginTop={15}>
        <Text fontSize='$4'>Top characters</Text>
        <CharactersSection />
        <Text fontSize='$4' marginTop={15}>
          Random anime
        </Text>
        <RandomSection />
      </View>
    </Wrapper>
  )
}
