import { getTrendingManga } from '@/api/trending/api';
import { MyAnimeListTrendingMangaResponse } from '@/api/trending/types';
import Header from '@/components/Header'
import Wrapper from "@/components/Wrapper";
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Input, XStack, Text, Button, View, Spinner } from 'tamagui';

export default function MangaScreen() {
  // const query = useQuery<MyAnimeListTrendingMangaResponse>({
  //   queryKey: ['trending-manga'],
  //   queryFn: getTrendingManga
  // })

  // let trendingSection = null

  // if (query.isLoading) {
  //   trendingSection = (
  //     <View justifyContent='center' alignItems='center'>
  //       <Spinner size='large' color='$blue10Light' />
  //     </View>
  //   )
  // }

  // if (query.isError) {
  //   trendingSection = (
  //     <View justifyContent='center' alignItems='center'>
  //       <Text col='$red10Light' fontSize='$4'>
  //         {query.error.message}
  //       </Text>
  //     </View>
  //   )
  // }

  // if (query.isSuccess) {

  // }

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
