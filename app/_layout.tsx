/// <reference types="nativewind/types" />

import { RconProvider } from '@/hooks/rcon'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { colorScheme, useColorScheme } from 'nativewind'
import React, { StatusBar } from 'react-native'
import './global.css'

colorScheme.set('system')

export default function RootLayout() {
  const { colorScheme } = useColorScheme()

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#000' : '#FFF'}
      ></StatusBar>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RconProvider>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          </Stack>
        </RconProvider>
      </ThemeProvider>
    </>
  )
}
