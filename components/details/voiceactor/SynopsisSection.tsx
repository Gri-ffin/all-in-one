import type { VoiceActorResponse } from "@/api/details/types"
import { Ionicons } from "@expo/vector-icons"
import { ScrollView, Text } from "tamagui"

interface Props {
  data: VoiceActorResponse['data']
}

const SynopsisSection = ({ data }: Props) => {
  return (
    <>
      <Text fontSize='$4' marginTop={10}>Full name: <Text fontSize='$5' color='gray'>{data.name}</Text></Text>
      <Text fontSize='$4' marginVertical={5}>Birthday: <Text fontSize='$5' color='gray'>{new Date(data.birthday).toLocaleDateString()}</Text></Text>
      <Text fontSize='$4'>
        Favorites:
        <Text fontSize='$5' color='gray' alignItems="center">
          {data.favorites || ' ??'} <Ionicons name="heart" color='red' size={13} />
        </Text>
      </Text>
      <Text fontSize='$4' marginVertical={5}>
        Nicknames:
        <Text fontSize='$5' color='gray' alignItems="center">
          {' '}{data.alternate_names.join(', ')}
        </Text>
      </Text>
      <Text fontSize='$4'>About: </Text>
      <ScrollView marginTop={5} contentContainerStyle={{ paddingBottom: 400 }}>
        <Text fontSize={12} minHeight='$20' lineHeight={20} color='gray'>{data.about || 'No description available.'}</Text>
      </ScrollView>
    </>
  )
}

export default SynopsisSection
