import { Rcon } from '@/hooks/rcon'
import { useServerStorePersistence } from '@/hooks/store-server'
import {
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_400Regular_Italic,
  AtkinsonHyperlegible_700Bold,
  AtkinsonHyperlegible_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/atkinson-hyperlegible'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import React, { StatusBar } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
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
  const { colorScheme } = useColorScheme()

  const { isLoading } = useServerStorePersistence()

  let [hasAtkinsonHyperlegibleLoaded] = useFonts({
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_400Regular_Italic,
    AtkinsonHyperlegible_700Bold,
    AtkinsonHyperlegible_700Bold_Italic,
  })

  useEffect(() => {
    if (!isLoading && hasAtkinsonHyperlegibleLoaded) {
      SplashScreen.hideAsync()
    }
  }, [isLoading, hasAtkinsonHyperlegibleLoaded])

  if (isLoading && !hasAtkinsonHyperlegibleLoaded) {
    return null
  }

  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <SafeAreaProvider>
        <SafeAreaView className='flex-1' edges={['top']}>
          <ThemeProvider value={theme}>
            <Rcon>
              <Stack>
                <Stack.Screen name='index' options={{ title: 'Dashboard', headerShown: false }} />
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
            </Rcon>
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  )
}
