import { ServerOverview } from '@/components/server-overview'
import { ServerWhitelist } from '@/components/server-whitelist'
import * as React from 'react'
import { ScrollView, View } from 'react-native'

export default function Home() {
  return (
    <ScrollView>
      <View className='justify-center items-center p-4 gap-12'>
        <ServerOverview />
        <ServerWhitelist />
      </View>
    </ScrollView>
  )
}
