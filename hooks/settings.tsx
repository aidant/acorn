import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { queryClient } from './rcon'

export const useServer = () => {
  return useQuery({
    queryKey: ['settings', 'server'],
    queryFn: async () => {
      const [host, port, password] = await Promise.all([
        AsyncStorage.getItem('settings.server.host'),
        AsyncStorage.getItem('settings.server.port'),
        getItemAsync('settings.server.password'),
      ])

      if (!host || !port || !password) {
        return
      }

      return {
        host: host,
        port: Number(port),
        password: password,
      }
    },
  })
}

export const useServerMutation = () => {
  return useMutation({
    mutationFn: async ({
      host,
      port,
      password,
    }: {
      host: string
      port: number
      password: string
    }) => {
      await Promise.all([
        AsyncStorage.setItem('settings.server.host', host),
        AsyncStorage.setItem('settings.server.port', String(port)),
        setItemAsync('settings.server.password', password),
      ])
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'server'] })
    },
  })
}
