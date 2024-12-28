import { useRcon } from '@/hooks/rcon.tsx'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

export default function Home() {
  const rcon = useRcon()
  const [onlinePlayers, setOnlinePlayers] = useState({
    count: 0,
    max: 0,
    players: [] as string[],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      rcon.list().then((value) => {
        console.log(value)
        setOnlinePlayers(value)
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [rcon])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text className='dark:text-white text-black'>
        There are {onlinePlayers.count} of a max of {onlinePlayers.max} players online:
      </Text>
      {onlinePlayers.players.map((player) => (
        <Text className='dark:text-white text-black' key={player}>
          {player}
        </Text>
      ))}
    </View>
  )
}
