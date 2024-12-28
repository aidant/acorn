import { createRconClient as _createRconClient, minecraft } from '@lazy/rcon'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, type ReactElement } from 'react'
import TcpSocket from 'react-native-tcp-socket'
import { useServer } from './settings'

export const queryClient = new QueryClient()

export const RconProvider = ({ children }: { children: ReactElement }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export const createRconClient = () => {
  return _createRconClient(
    (options) => TcpSocket.createConnection(options, () => {}),
    undefined,
    minecraft,
  )
}

export const useRcon = () => {
  const { data: options } = useServer()
  const rcon = createRconClient()

  useEffect(() => {
    rcon.$configure(options)
    rcon.$disconnect()
  }, [options])

  return rcon
}
