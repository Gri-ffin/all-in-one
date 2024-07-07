import Avatar from '@/components/Avatar'
import config from '@/tamagui.config'
import { Text, XStack, YStack, styled } from 'tamagui'

const SecondaryText = styled(Text, {
  color: config.themes.secondary.gray,
  fontSize: 12
})

const Header = () => {
  return (
    <XStack alignItems='center' justifyContent='space-between'>
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
    </XStack>
  )
}

export default Header
