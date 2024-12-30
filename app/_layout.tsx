import { RconProvider } from '@/hooks/rcon'
import { useServerStorePersistence } from '@/hooks/store'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import React, { StatusBar } from 'react-native'
import './global.css'

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4d7c0f',
    background: '#fafaf9',
  },
}
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#65a30d',
    background: '#1c1917',
  },
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme()
  setColorScheme('dark')

  const { isLoading } = useServerStorePersistence()
  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync()
    }
  }, [isLoading])

  if (isLoading) {
    return null
  }

  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#000000' : '#ffffff'}
      ></StatusBar>
      <ThemeProvider value={theme}>
        <RconProvider>
          <Stack>
            <Stack.Screen name='index' options={{ title: 'Dashboard', headerShown: false }} />
            <Stack.Screen
              name='commands'
              options={{ title: 'Commands', headerTransparent: true }}
            />
            <Stack.Screen
              name='server-settings'
              options={{
                title: 'Server settings',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerShadowVisible: false,
                headerBackButtonDisplayMode: 'minimal',
              }}
            />
          </Stack>
        </RconProvider>
      </ThemeProvider>
    </>
  )
}
