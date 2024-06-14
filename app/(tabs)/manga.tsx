import Header from '@/components/Header'
import Wrapper from "@/components/Wrapper";
import { Input } from 'tamagui';

export default function MangaScreen() {
  return (
    <Wrapper>
      <Header />
      <Input placeholder='Seach manga' marginTop={22} />
    </Wrapper>
  )
}
