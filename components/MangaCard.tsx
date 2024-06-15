import { Ionicons } from "@expo/vector-icons"
import config from "@/tamagui.config"
import { View, Text, Image, XStack, YStack } from "tamagui"

interface Props {
  title: string
  image_source: string
  score: number
  popularity: number
  from: string
  to?: string
}

const MangaCard = ({ title, image_source, score, popularity, from, to }: Props) => {
  return (
    <XStack
      justifyContent="space-between"
      backgroundColor={config.themes.secondary.gradient}
      padding={10}
      borderRadius={20}
      shadowColor='gray'
      shadowOffset={{ width: 5, height: 5 }}
      shadowOpacity={1}
      shadowRadius={20}
      elevationAndroid={10}
      elevation={10}
    >
      <XStack>
        <Image source={{ uri: image_source }} alt={title} width={60} height={90} borderRadius={10} />
        <View justifyContent="space-between" flexDirection="column" marginLeft={10}>
          <View>
            <Text color='white' fontSize='$4' overflow="hidden" textOverflow="ellipsis" numberOfLines={2}>{title}</Text>
            <XStack alignItems='center'>
              <Ionicons name='star' size={16} color='orange' />
              <Text color='white' fontSize='$6'>
                {' '}
                {score}
              </Text>
            </XStack>

          </View>
          <Text fontSize='$6' color='white'>Rank: #{popularity}</Text>
        </View>
      </XStack>
      <YStack justifyContent="center" alignItems="center">
        <Text color='white'>from: {new Date(from).getFullYear()}</Text>
        {to && <Text color='white'>to: {new Date(to).getFullYear()}</Text>}
      </YStack>
    </XStack>
  )
}

export default MangaCard
