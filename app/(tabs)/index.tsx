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
    if (!rcon) {
      return
    }

    rcon.list({}).then(setOnlinePlayers)
  }, [rcon])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>
        There are {onlinePlayers.count} of a max of {onlinePlayers.max} players online:
      </Text>
      {onlinePlayers.players.map((player) => (
        <Text key={player}>{player}</Text>
      ))}
    </View>
  )
}
