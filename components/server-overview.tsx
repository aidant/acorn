import { Container } from '@/components/ui/container'
import { Indicator } from '@/components/ui/indicator'
import { Text } from '@/components/ui/text'
import { useOverview, useOverviewIsConnected } from '@/hooks/store-overview'
import { useServerHost, useServerName, useServerPort } from '@/hooks/store-server'
import { Link } from 'expo-router'
import * as React from 'react'
import { View } from 'react-native'

const ServerOverviewStats = () => {
  const serverName = useServerName()
  const serverHost = useServerHost()
  const serverPort = useServerPort()
  const isConnected = useOverviewIsConnected()

  return (
    <Container className='px-6 py-4 rounded-b-none'>
      <View className='flex flex-row gap-2 justify-between items-center'>
        <View className='flex flex-col gap-2 flex-shrink'>
          <View className='flex flex-row gap-2 items-center'>
            <Indicator enabled={isConnected} />
            <Text className='flex-shrink text-lg'>{serverName}</Text>
          </View>
          <Text
            className='dark:text-stone-400 text-stone-400 text-md'
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {isConnected ? 'Connected to' : 'Disconnected from'} {serverHost}:{serverPort}
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
  const overview = useOverview()

  return (
    <>
      <View className='flex flex-row w-full'>
        <Container className='px-6 py-4 border-t-0 rounded-none flex-grow gap-1 flex-shrink'>
          <Text className='dark:text-stone-300' numberOfLines={1} ellipsizeMode='tail'>
            Online
          </Text>
          {overview.playersOnline === undefined ? (
            <Text
              className='dark:text-stone-400 text-stone-400 text-lg'
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              Unknown
            </Text>
          ) : (
            <View className='flex flex-row items-baseline gap-1'>
              <Text className='text-lg '>{overview.playersOnline}</Text>
              <Text
                className='text-sm dark:text-stone-400 text-stone-400'
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {overview.playersOnline === 1 ? 'player' : 'players'}
              </Text>
            </View>
          )}
        </Container>
        <Container className='px-6 py-4 border-t-0 rounded-none border-l-0 flex-grow gap-1 flex-shrink'>
          <Text className='dark:text-stone-300' numberOfLines={1} ellipsizeMode='tail'>
            Limit
          </Text>
          {overview.playersLimit === undefined ? (
            <Text
              className='dark:text-stone-400 text-stone-400 text-lg'
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              Unknown
            </Text>
          ) : (
            <View className='flex flex-row items-baseline gap-1'>
              <Text className='text-lg '>{overview.playersLimit}</Text>
              <Text
                className='text-sm dark:text-stone-400 text-stone-400'
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {overview.playersLimit === 1 ? 'player' : 'players'}
              </Text>
            </View>
          )}
        </Container>
        <Container className='px-6 py-4 border-t-0 rounded-none border-l-0 flex-grow gap-1 flex-shrink'>
          <Text className='dark:text-stone-300' numberOfLines={1} ellipsizeMode='tail'>
            Latency
          </Text>
          {overview.latency === undefined ? (
            <Text
              className='dark:text-stone-400 text-stone-400 text-lg'
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              Unknown
            </Text>
          ) : (
            <View className='flex flex-row items-baseline gap-1'>
              <Text className='text-lg '>{overview.latency}</Text>
              <Text className='text-sm dark:text-stone-400 text-stone-400'>ms</Text>
            </View>
          )}
        </Container>
      </View>
      <Container className='px-6 py-4 border-t-0 rounded-t-none gap-1'>
        <Text className='dark:text-stone-300'>Players</Text>
        <View className='flex flex-row flex-wrap gap-4'>
          {overview.players === undefined ? (
            <Text
              className='dark:text-stone-400 text-stone-400 text-lg'
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              Unknown
            </Text>
          ) : overview.players.length === 0 ? (
            <Text className='text-lg dark:text-stone-400 text-stone-400'>None</Text>
          ) : (
            overview.players.map((player) => {
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
