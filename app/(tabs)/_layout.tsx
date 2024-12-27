import { Tabs } from 'expo-router'

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{ title: 'Overview', headerShown: false }} />
      <Tabs.Screen name='commands' options={{ title: 'Commands', headerShown: false }} />
      <Tabs.Screen name='settings' options={{ title: 'Settings', headerShown: false }} />
    </Tabs>
  )
}
