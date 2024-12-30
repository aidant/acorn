import { createRconClient as _createRconClient, minecraft } from '@lazy/rcon'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, type ReactElement } from 'react'
import TcpSocket from 'react-native-tcp-socket'
import { useServerHost, useServerPassword, useServerPort } from './store'

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
  const host = useServerHost()
  const port = useServerPort()
  const password = useServerPassword()

  const rcon = createRconClient()

  useEffect(() => {
    rcon.$configure({ host, port, password })
    rcon.$disconnect()
  }, [host, port, password])

  return rcon
}
