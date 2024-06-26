import StackHeader from "@/components/StackHeader"
import Wrapper from "@/components/Wrapper"
import { useLocalSearchParams } from "expo-router"

const VoiceActorScreen = () => {
  const { id } = useLocalSearchParams()

  return (
    <Wrapper>
      <StackHeader title="Voice actor" />
    </Wrapper>
  )
}

export default VoiceActorScreen
