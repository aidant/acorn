import {
  createRconClient as _createRconClient,
  createGameClient,
  type CreateRconClientOptions,
} from '@lazy/rcon/byo-transport-net'
import { commands } from '@lazy/rcon/dist/minecraft'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { type ReactElement } from 'react'
import TcpSocket from 'react-native-tcp-socket'
import { useServer } from './settings'

export const queryClient = new QueryClient()

export const RconProvider = ({ children }: { children: ReactElement }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export const createRconClient = async (options: CreateRconClientOptions) => {
  const rcon = await _createRconClient(options, TcpSocket.createConnection)
  const game = createGameClient(rcon, commands)

  return { rcon, game }
}

export const useRcon = () => {
  const { data: options } = useServer()
  const { data } = useQuery({
    queryKey: ['rcon'],
    queryFn: async () => createRconClient(options!),
    enabled: !!options,
  })

  return data?.game
}
