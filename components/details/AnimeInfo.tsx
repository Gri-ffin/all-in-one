import { XStack, YStack, Text, Image } from "tamagui"
import { ExternalLink } from "../ExternalLink"
import type { AnimeResponse } from "@/api/details/types"

interface Props {
  data: AnimeResponse['data']
}

const AnimeInfo = ({ data }: Props) => {
  return (
    <XStack marginTop={20}>
      <Image
        width={130}
        height={180}
        source={{ uri: data.images.jpg.large_image_url }}
        borderRadius={15}
      />
      <YStack
        flexDirection='column'
        justifyContent='center'
        marginLeft={8}
        width={150}
      >
        <Text fontSize='$4'>{data.title}</Text>
        <Text fontSize='$6' color='gray' marginVertical={6}>
          status: {data.status}
        </Text>
        <Text fontSize='$6' color='gray' marginBottom={6}>
          rank: #{data.popularity}
        </Text>
        <Text fontSize='$6' color='gray' marginBottom={6}>
          season: {data.season || '??'}
        </Text>
        <Text fontSize='$6' color='gray' marginBottom={5}>
          studio:{' '}
          <ExternalLink
            style={{ color: 'blue' }}
            href={
              data.studios && data.studios[0] ? data.studios[0].url : ''
            }
          >
            {data.studios &&
              data.studios[0] ? data.studios[0].name
              : '??'
            }
          </ExternalLink>
        </Text>
        <Text fontSize='$6' color='gray' lineHeight={20}>
          genres:{' '}
          {
            data.genres && data.genres.map(genre => genre.name).join(', ') || '??'
          }
        </Text>
      </YStack>
    </XStack>
  )
}

export default AnimeInfo
