import { Container } from '@/components/ui/container'
import { Indicator } from '@/components/ui/indicator'
import { Text } from '@/components/ui/text'
import { useRcon, useRconStats } from '@/hooks/rcon'
import { useServerName } from '@/hooks/store'
import { useTimeRelative } from '@/hooks/time-relative'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import * as React from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'

const ServerOverviewStats = () => {
  const serverName = useServerName()
  const stats = useRconStats()
  const relative = useTimeRelative(stats.timestamp)

  return (
    <Container className='px-6 py-4 rounded-b-none'>
      <View className='flex flex-row gap-2 justify-between items-center'>
        <View className='flex flex-col gap-2 flex-shrink'>
          <View className='flex flex-row gap-2 items-center'>
            <Indicator enabled={stats.isConnected} />
            <Text className='flex-shrink text-lg'>{serverName}</Text>
          </View>
          <Text
            className='dark:text-stone-400 text-stone-400 text-md'
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {stats.isConnected ? 'Connected' : 'Disconnected'} for {relative}
          </Text>
        </View>

        <View>
          <Link
            href='/server-settings'
            className='dark:text-white text-black text-base border border-stone-700 rounded-full px-3 py-1 flex-shrink-0'
          >
            Edit
          </Link>
        </View>
      </View>
    </Container>
  )
}

const ServerOverviewList = () => {
  const rcon = useRcon()

  const { data, refetch } = useQuery({
    queryKey: ['rcon', 'minecraft', 'list'],
    queryFn: async () => {
      return rcon.list()
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [refetch])

  return (
    <>
      <View className='flex flex-row w-full'>
        <Container className='px-6 py-4 border-t-0 rounded-none flex-grow gap-1'>
          <Text className='dark:text-stone-300'>Player count</Text>
          {!data ? (
            <Text className='dark:text-stone-400 text-stone-400 text-lg'>Unknown</Text>
          ) : (
            <Text className='text-lg'>{data.count}</Text>
          )}
        </Container>
        <Container className='px-6 py-4 border-t-0 rounded-none border-l-0 flex-grow gap-1'>
          <Text className='dark:text-stone-300'>Player limit</Text>
          {!data ? (
            <Text className='dark:text-stone-400 text-stone-400 text-lg'>Unknown</Text>
          ) : (
            <Text className='text-lg'>{data.max}</Text>
          )}
        </Container>
      </View>
      <Container className='px-6 py-4 border-t-0 rounded-t-none gap-1'>
        <Text className='dark:text-stone-300'>Players</Text>
        <View className='flex flex-row flex-wrap gap-4'>
          {!data?.players.length ? (
            <Text className='dark:text-stone-400 text-stone-400 text-lg'>Unknown</Text>
          ) : (
            data?.players.map((player) => {
              return (
                <Text key={player} className='text-lg'>
                  {player}
                </Text>
              )
            })
          )}
        </View>
      </Container>
    </>
  )
}

export const ServerOverview = () => {
  return (
    <View className='w-full'>
      <ServerOverviewStats />
      <ServerOverviewList />
    </View>
  )
}
