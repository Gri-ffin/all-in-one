import { Text, View } from '@tamagui/core'
import { Input } from 'tamagui'
import TrendingSection from '@/components/index/TrendingSection'
import Header from '@/components/index/Header'
import CharactersSection from '@/components/index/CharactersSection'
import RandomSection from '@/components/index/RandomSection'
import Wrapper from '@/components/Wrapper'

export default function AnimeScreen() {
  return (
    <Wrapper>
      <Header />
      <Input placeholder='Search manga or anime' marginTop={22} />
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
