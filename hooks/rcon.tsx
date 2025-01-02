import { createRconClient as _createRconClient, minecraft } from '@lazy/rcon'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState, type ReactElement } from 'react'
import TcpSocket from 'react-native-tcp-socket'
import { useServerHost, useServerPassword, useServerPort } from './store'

export const queryClient = new QueryClient()

export const QueryProvider = ({ children }: { children: ReactElement }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const createRconClient = () => {
  return _createRconClient(
    (options) => TcpSocket.createConnection(options, () => {}),
    undefined,
    minecraft,
  )
}

const rcon = createRconClient()
const RconContext = createContext(rcon)

export const RconProvider = ({ value, children }: { value: any; children: ReactElement }) => {
  return <RconContext.Provider value={value}>{children}</RconContext.Provider>
}

export const useRcon = () => {
  const host = useServerHost()
  const port = useServerPort()
  const password = useServerPassword()
  const rcon = useContext(RconContext)

  useEffect(() => {
    rcon.$configure({ host, port, password })
    rcon.$disconnect()
  }, [host, port, password])

  return rcon
}

export const useRconStats = () => {
  const rcon = useContext(RconContext)
  const [stats, setStats] = useState(rcon.$stats())

  useEffect(() => {
    const unsubscribe = rcon.$observeStats((_stats) => {
      if (
        stats.isConnected !== _stats.isConnected ||
        stats.lastResponseLatencyInMs !== _stats.lastResponseLatencyInMs ||
        stats.lastResponseTimestampInMs !== _stats.lastResponseTimestampInMs
      ) {
        setStats(_stats)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return stats
}
