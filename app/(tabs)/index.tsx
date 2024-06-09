import config from '@/tamagui.config'
import { Ionicons } from '@expo/vector-icons'
import { Text, View, styled } from '@tamagui/core'
import { Image, Input, XStack, YStack } from 'tamagui'

const SecondaryText = styled(Text, {
  color: config.themes.secondary.gray,
  fontSize: 12
})

export default function HomeScreen() {
  return (
    <View marginHorizontal={33} marginVertical={58}>
      <XStack alignItems='center' justifyContent='space-between'>
        {/* TODO: the source of the image should be updated to the user pfp, the same can be said to the lable */}
        <XStack>
          <Image
            borderRadius={100}
            source={{ uri: 'https://i.pravatar.cc/300' }}
            alt='Avatar'
            width={60}
            height={60}
          />
          <YStack
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            marginLeft={10}
          >
            <SecondaryText>Stay trending!</SecondaryText>
            {/* TODO: add the username of the user */}
            <Text fontSize='$5'>Illia Frunza</Text>
          </YStack>
        </XStack>
        <View shadowColor='black'>
          <Ionicons size={28} name='settings-outline' color='black' />
        </View>
      </XStack>
      <Input placeholder='Search manga or anime' />
    </View>
  )
}
