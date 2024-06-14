import Header from '@/components/Header'
import Wrapper from "@/components/Wrapper";
import { Ionicons } from '@expo/vector-icons';
import { Input, XStack, Text, Button } from 'tamagui';

export default function MangaScreen() {


  return (
    <Wrapper>
      <Header />
      <Input placeholder='Seach manga' marginTop={22} />
      <XStack alignItems='center' justifyContent='space-between' marginTop={17}>
        <Text fontSize='$4'>Trending Manga</Text>
        <Button>
          <Ionicons size={28} name='ellipsis-horizontal' color='black' />
        </Button>
      </XStack>
    </Wrapper>
  )
}
