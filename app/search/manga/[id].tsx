import Wrapper from "@/components/Wrapper"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { Text, View, Spinner, ScrollView, Button } from 'tamagui'
import config from "@/tamagui.config"
import StackHeader from "@/components/StackHeader"
import type { MangaSearchResponse } from "@/api/search/manga/types"
import { getMangaSearch } from "@/api/search/manga/api"
import MangaCard from "@/components/MangaCard"

const SearchPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<MangaSearchResponse>({
    queryKey: ['manga-search', id],
    queryFn: ({ pageParam = 1 }) => getMangaSearch({ id, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.pagination.has_next_page && pages.length + 1
  })

  if (status === 'pending') {
    return (
      <View justifyContent='center' alignItems='center' height='100%'>
        <Spinner size='large' color='$blue10Light' />
      </View>
    )
  }

  if (status === 'error') {
    return (
      <View justifyContent='center' alignItems='center' height='100%'>
        <Text color='$red10Light' fontSize='$3'>
          {error.message}
        </Text>
      </View>
    )
  }

  return (
    <Wrapper>
      <StackHeader title="Search" />
      <Text fontSize='$4' textAlign="center" marginVertical={15} fontWeight='400'>{id}</Text>
      <ScrollView showsVerticalScrollIndicator={false} height={600}>
        <View gap={20}>
          {data.pages.map((page, index) => (
            <View key={index} gap={20}>
              {page.data.map(manga => (
                <MangaCard
                  title={manga.title}
                  image_source={manga.images.jpg.image_url}
                  popularity={manga.popularity}
                  score={manga.score}
                  from={manga.published.from}
                  key={manga.mal_id}
                  id={manga.mal_id}
                />
              ))}
            </View>
          ))}
        </View>
        {hasNextPage && (
          <Button
            onPress={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            backgroundColor={config.themes.secondary.gradient}
            color='white'
            marginVertical={20}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </Button>
        )}
      </ScrollView>
    </Wrapper>)
}

export default SearchPage
