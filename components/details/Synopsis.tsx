import type { AnimeResponse } from "@/api/details/types"
import type { UseQueryResult } from "@tanstack/react-query"
import { XStack, YStack, Text, ScrollView, Button } from "tamagui"
import config from '@/tamagui.config'

interface Props {
  query: UseQueryResult<AnimeResponse, Error>
}

const SynopsisSection = ({ query }: Props) => {
  return (
    <>
      <XStack marginTop={30} borderWidth={0.3} borderRadius={20} width={309} marginHorizontal={-8}>
        <YStack borderRightWidth={0.3} width="32%" alignItems="center" paddingVertical={17} justifyContent="center">
          <Text fontSize='$3' textAlign="center">{query.data?.data.type}</Text>
          <Text fontSize='$6' color='gray'>Type</Text>
        </YStack>
        <YStack borderRightWidth={0.3} width='34%' alignItems="center" paddingVertical={17} justifyContent="center">
          <Text fontSize='$3' textAlign="center">{query.data?.data.source}</Text>
          <Text fontSize='$6' color='gray'>Source</Text>
        </YStack>
        <YStack width='34%' alignItems="center" paddingVertical={17} justifyContent="center">
          <Text fontSize='$3' textAlign="center">{query.data?.data.rating.split(' - ')[0]}</Text>
          <Text fontSize='$6' color='gray'>Rating</Text>
        </YStack>
      </XStack>
      <ScrollView marginTop={30} height='$20' contentContainerStyle={{ paddingBottom: 40 }}>
        <Text fontSize={12} lineHeight={20} overflow="scroll">{query.data?.data.synopsis}</Text>
        <Button marginTop={15} color='white' bg={config.themes.secondary.gradient}>Add to favorites</Button>
      </ScrollView>
    </>
  )
}

export default SynopsisSection
