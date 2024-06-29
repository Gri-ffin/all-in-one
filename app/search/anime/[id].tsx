import { getAnimeSearch } from "@/api/search/anime/api"
import { AnimeSearchResponse } from "@/api/search/anime/types"
import Wrapper from "@/components/Wrapper"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { Text, View, Spinner, ScrollView, Button } from 'tamagui'
import AnimeCard from "@/components/AnimeSearchCard"
import config from "@/tamagui.config"
import StackHeader from "@/components/StackHeader"

const SearchPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<AnimeSearchResponse>({
    queryKey: ['anime-search', id],
    queryFn: ({ pageParam = 1 }) => getAnimeSearch({ id, pageParam }),
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
              {page.data.map(anime => (
                <AnimeCard
                  title={anime.title}
                  image_source={anime.images.jpg.image_url}
                  popularity={anime.popularity}
                  score={anime.score}
                  from={anime.aired.from}
                  key={anime.mal_id}
                  id={anime.mal_id}
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
