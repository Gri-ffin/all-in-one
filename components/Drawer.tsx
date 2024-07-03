import { Overlay, YStack, Button, Separator, Text, View } from "tamagui"
import { Ionicons } from "@expo/vector-icons"
import config from "@/tamagui.config"

interface Item<T> {
  name: T
  switch: () => void
}

interface Props<T> {
  items: Item<T>[]
  toggleDrawer: () => void
}

function Drawer<T>({ items, toggleDrawer }: Props<T>) {
  return (
    <Overlay>
      <YStack
        position='absolute'
        top={180}
        right={0}
        width={200}
        backgroundColor={config.themes.secondary.gradient}
        shadowOpacity={0.3}
        shadowOffset={{ width: 0, height: 2 }}
        shadowRadius={4}
        padding={16}
        borderRadius={15}
      >
        {items.map(item => (
          <View key={item.name} gap={15} marginVertical={10}>
            <Text color='white' onPress={item.switch} textAlign="center">Top {item.name}</Text>
            <Separator borderColor='white' />
          </View>
        ))}
        <Button onPress={toggleDrawer}>
          <Ionicons size={20} name='close' color='white' />
        </Button>
      </YStack>
    </Overlay>
  )
}

export default Drawer
