import { View } from "tamagui"

interface Props {
  children: React.ReactNode
}

const Wrapper = ({ children }: Props) => {
  return (
    <View marginHorizontal={33} marginVertical={58}>
      {children}
    </View>
  )
}

export default Wrapper
