import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "expo-router"
import { Button, XStack, Text } from "tamagui"

interface Props {
  title: string
}

const StackHeader = ({ title }: Props) => {
  const navigation = useNavigation()

  return (
    <XStack alignItems='center' marginTop={-15} marginHorizontal={-15}>
      <Button onPress={() => navigation.goBack()}>
        <Ionicons size={28} name='arrow-back' />
      </Button>
      <Text textAlign='center' flex={0.8} fontSize='$5'>
        {title}
      </Text>
    </XStack>
  )
}

export default StackHeader
