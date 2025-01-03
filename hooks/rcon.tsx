import { createRconClient, minecraft } from '@lazy/rcon'
import { useEffect, useRef } from 'react'
import TcpSocket from 'react-native-tcp-socket'
import { handleOverviewList, handleOverviewStats, handleOverviewWhitelist } from './store-overview'
import { useServerHost, useServerPassword, useServerPort } from './store-server'

export const rcon = createRconClient(
  (options) => TcpSocket.createConnection(options, () => {}),
  undefined,
  minecraft,
)

export const useRconImpl = () => {
  const host = useServerHost()
  const port = useServerPort()
  const password = useServerPassword()
  const ref = useRef(Promise.resolve())

  useEffect(() => {
    rcon.$configure({ host, port, password })
    rcon.$disconnect()
  }, [host, port, password])

  useEffect(() => {
    const unsubscribe = rcon.$observeStats(handleOverviewStats)

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const impl = () => {
      ref.current = ref.current
        .finally(() => rcon.list().then(handleOverviewList))
        .finally(() => rcon.whitelist().then(handleOverviewWhitelist))
    }

    impl()

    const interval = setInterval(impl, 999)

    return () => {
      clearInterval(interval)
      rcon.$disconnect()
    }
  }, [])
}

export const handleWhitelistAdd = (player: string) => {
  rcon.whitelistAdd({ player }).then(() => rcon.whitelist().then(handleOverviewWhitelist))
}
export const handleWhitelistRemove = (player: string) => {
  rcon.whitelistRemove({ player }).then(() => rcon.whitelist().then(handleOverviewWhitelist))
}
