import { RconProvider } from '@/hooks/rcon'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <RconProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </RconProvider>
  )
}
