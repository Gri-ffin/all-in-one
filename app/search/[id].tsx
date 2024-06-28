import Wrapper from "@/components/Wrapper"
import { useLocalSearchParams } from "expo-router"
import { Text } from 'tamagui'

const SearchPage = () => {
  const { id } = useLocalSearchParams()
  return (
    <Wrapper>
      <Text>{id}</Text>
    </Wrapper>
  )
}

export default SearchPage
