import Avatar from '@/components/Avatar'
import config from '@/tamagui.config'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Button, Text, XStack, YStack, styled } from 'tamagui'

const SecondaryText = styled(Text, {
  color: config.themes.secondary.gray,
  fontSize: 12
})

const Header = () => {
  return (
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
          <Text fontSize='$5'>All in one</Text>
        </YStack>
      </XStack>
      <Link asChild href='/settings/'>
        <Button>
          <Ionicons size={28} name='settings-outline' color='black' />
        </Button>
      </Link>
    </XStack>
  )
}

export default Header
