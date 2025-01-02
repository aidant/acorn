import { Container } from '@/components/ui/container'
import { Indicator } from '@/components/ui/indicator'
import { Text } from '@/components/ui/text'
import { useRcon, useRconStats } from '@/hooks/rcon'
import { useServerHost, useServerName, useServerPort } from '@/hooks/store'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import * as React from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'

const ServerOverviewStats = () => {
  const serverName = useServerName()
  const serverHost = useServerHost()
  const serverPort = useServerPort()
  const stats = useRconStats()

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
            {stats.isConnected ? 'Connected to' : 'Disconnected from'} {serverHost}:{serverPort}
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
  const stats = useRconStats()

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
        <Container className='px-6 py-4 border-t-0 rounded-none flex-grow gap-1 flex-shrink'>
          <Text className='dark:text-stone-300' numberOfLines={1} ellipsizeMode='tail'>
            Online
          </Text>
          {!data ? (
            <Text className='dark:text-stone-400 text-stone-400 text-lg'>Unknown</Text>
          ) : (
            <View className='flex flex-row items-baseline gap-1'>
              <Text className='text-lg'>{data.count}</Text>
              <Text className='text-sm dark:text-stone-300' numberOfLines={1} ellipsizeMode='tail'>
                players
              </Text>
            </View>
          )}
        </Container>
        <Container className='px-6 py-4 border-t-0 rounded-none border-l-0 flex-grow gap-1 flex-shrink'>
          <Text className='dark:text-stone-300' numberOfLines={1} ellipsizeMode='tail'>
            Limit
          </Text>
          {!data ? (
            <Text className='dark:text-stone-400 text-stone-400 text-lg'>Unknown</Text>
          ) : (
            <View className='flex flex-row items-baseline gap-1'>
              <Text className='text-lg'>{data.max}</Text>
              <Text className='text-sm dark:text-stone-300' numberOfLines={1} ellipsizeMode='tail'>
                players
              </Text>
            </View>
          )}
        </Container>
        <Container className='px-6 py-4 border-t-0 rounded-none border-l-0 flex-grow gap-1 flex-shrink'>
          <Text className='dark:text-stone-300' numberOfLines={1} ellipsizeMode='tail'>
            Latency
          </Text>
          {stats.lastResponseLatencyInMs === undefined ? (
            <Text className='dark:text-stone-400 text-stone-400 text-lg'>Unknown</Text>
          ) : (
            <View className='flex flex-row items-baseline gap-1'>
              <Text className='text-lg'>{stats.lastResponseLatencyInMs}</Text>
              <Text className='text-sm dark:text-stone-300'>ms</Text>
            </View>
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
