import { Fragment } from "react"
import { XStack, Text, Separator } from "tamagui"
import config from "@/tamagui.config"

interface Tab {
  key: string
  label: string
}

interface Props {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (value: React.SetStateAction<string>) => void
}

const Tabs = ({ tabs, activeTab, setActiveTab }: Props) => {
  return (
    <XStack
      marginTop={30}
      borderWidth={0.3}
      borderRadius={15}
      alignItems='center'
      justifyContent='center'
      paddingVertical={8}
      width='100%'
    >
      {tabs.map((tab, index) => (
        <Fragment key={tab.key}>
          <Text
            color={activeTab === tab.key ? config.themes.secondary.gradient : 'gray'}
            onPress={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Text>
          {index < tabs.length - 1 && (
            <Separator alignSelf='stretch' vertical marginHorizontal={15} />
          )}
        </Fragment>
      ))}
    </XStack>
  )
}

export default Tabs
