import { View } from 'tamagui'
import YoutubePlayer from 'react-native-youtube-iframe'

interface Props {
  youtubeId: string
}

const VideoPlayer = ({ youtubeId }: Props) => {
  return (
    <View marginTop={20}>
      <YoutubePlayer
        height={170}
        play={false}
        videoId={youtubeId}
        mute={false}
      />
    </View>
  )
}

export default VideoPlayer
