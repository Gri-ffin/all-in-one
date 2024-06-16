import Wrapper from "@/components/Wrapper"
import { useLocalSearchParams } from "expo-router"
import { Text } from "tamagui"

const DetailsScreen = () => {
  const { id } = useLocalSearchParams()
  return (
    <Wrapper>
      <Text>id: {id}</Text>
    </Wrapper>
  )
}

export default DetailsScreen
