import config from '@/tamagui.config'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Image, Text, XStack, YStack } from 'tamagui'

interface Props {
  imageSource: string
  title: string
  score: number
  id: number
}

// the card should redirect to a details page about the anime passed in props
const AnimeCard = ({ imageSource, title, score, id }: Props) => {
  return (
    <Link href={{ pathname: '/details/[id]', params: { id } }}>
      <YStack width={120}>
        <Image
          source={{ uri: imageSource }}
          alt={title}
          width={120}
          height={150}
          borderRadius={15}
        />
        <Text
          fontSize='$4'
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          fontSize='$6'
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
        >
          <XStack alignItems='center'>
            <Ionicons name='star' size={16} color='orange' />
            <Text color={config.themes.secondary.gray} fontSize='$6'>
              {' '}
              {score}
            </Text>
          </XStack>
        </Text>
      </YStack>
    </Link>
  )
}

export default AnimeCard
