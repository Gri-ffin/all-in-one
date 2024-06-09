import Avatar from '@/components/Avatar'
import config from '@/tamagui.config'
import { Ionicons } from '@expo/vector-icons'
import { Text, View, styled } from '@tamagui/core'
import { Button, Image, Input, XStack, YStack } from 'tamagui'

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
          <Avatar
            source={{ uri: 'https://i.pravatar.cc/300' }}
            alt='Illia Frunza'
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
        <Button>
          <Ionicons size={28} name='settings-outline' color='black' />
        </Button>
      </XStack>
      <Input placeholder='Search manga or anime' marginTop={22} />
    </View>
  )
}
