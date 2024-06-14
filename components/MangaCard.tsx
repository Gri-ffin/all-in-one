import { View, Text, Image } from "tamagui"

interface Props {
  title: string
  image_source: string
  score: number
}

const MangaCard = ({ title, image_source, score }: Props) => {
  return (
    <View>
      <Image source={{ uri: image_source }} alt={title} width={60} height={90} borderRadius={10} />
      <Text fontSize='$4'>{title}</Text>
    </View>
  )
}

export default MangaCard
