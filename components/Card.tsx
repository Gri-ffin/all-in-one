import { Image, Text, YStack } from 'tamagui'

interface Props {
  imageSource: string
  title: string
  studio: string
}

const Card = ({ imageSource, title, studio }: Props) => {
  return (
    <YStack width={120}>
      <Image
        source={{ uri: imageSource }}
        alt={title}
        width={120}
        height={150}
      />
      <Text
        fontSize='$4'
        overflow='hidden'
        whiteSpace='nowrap'
        textOverflow='ellipsis'
      >
        {title}
      </Text>
      <Text
        fontSize='$6'
        overflow='hidden'
        whiteSpace='nowrap'
        textOverflow='ellipsis'
      >
        From {studio}
      </Text>
    </YStack>
  )
}

export default Card
