import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { Button, XStack, Text } from "tamagui"
import config from "@/tamagui.config"

interface Props {
  title: string
}

const StackHeader = ({ title }: Props) => {
  const navigation = useNavigation()
  const router = useRouter()

  return (
    <XStack alignItems='center' justifyContent="space-between" marginTop={-15}>
      <Button onPress={() => navigation.goBack()}>
        <Ionicons size={22} name='arrow-back' />
      </Button>
      <Text textAlign='center' flex={0.8} fontSize='$5'>
        {title}
      </Text>
      <Button onPress={() => router.navigate('/')}>
        <Ionicons size={22} name='home-outline' color={config.themes.secondary.gradient.val} />
      </Button>
    </XStack>
  )
}

export default StackHeader
