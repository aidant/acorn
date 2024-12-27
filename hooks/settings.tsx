import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { queryClient } from './rcon'

export const useServer = () => {
  return useQuery({
    queryKey: ['settings', 'server'],
    queryFn: async () => {
      const [host, port, pass] = await Promise.all([
        AsyncStorage.getItem('settings.server.host'),
        AsyncStorage.getItem('settings.server.port'),
        getItemAsync('settings.server.pass'),
      ])

      if (!host || !port || !pass) {
        return
      }

      return {
        host: host,
        port: Number(port),
        pass: pass,
      }
    },
  })
}

export const useServerMutation = () => {
  return useMutation({
    mutationFn: async ({ host, port, pass }: { host: string; port: number; pass: string }) => {
      await Promise.all([
        AsyncStorage.setItem('settings.server.host', host),
        AsyncStorage.setItem('settings.server.port', String(port)),
        setItemAsync('settings.server.pass', pass),
      ])
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'server'] })
    },
  })
}
