import { ServerOverview } from '@/components/server-overview'
import * as React from 'react'
import { View } from 'react-native'

export default function Home() {
  return (
    <View className='flex-1 justify-center items-center p-4'>
      <View className='w-full'>
        <ServerOverview />
      </View>
    </View>
  )
}
