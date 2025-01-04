import { createRconClient, minecraft } from '@lazy/rcon'
import { type ReactNode, useEffect, useRef } from 'react'
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
  const promise = useRef(Promise.resolve())
  const controller = useRef(new AbortController())

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
      promise.current = promise.current.then(() => {
        return Promise.race([
          new Promise<never>((_resolve, reject) => {
            const handleAbort = () => {
              controller.current.signal.removeEventListener('abort', handleAbort)

              reject()
            }

            controller.current.signal.addEventListener('abort', handleAbort)
          }),
          Promise.resolve()
            .finally(() => rcon.list().then(handleOverviewList))
            .finally(() => rcon.whitelist().then(handleOverviewWhitelist))
            .catch(() => {}),
        ])
      })
    }

    impl()

    const interval = setInterval(impl, 1000)

    return () => {
      controller.current.abort()
      clearInterval(interval)
      rcon.$disconnect()
      promise.current = Promise.resolve()
      controller.current = new AbortController()
    }
  }, [])
}

export const Rcon = (props: { children: ReactNode }) => {
  useRconImpl()

  return props.children
}

export const handleWhitelistAdd = (player: string) => {
  rcon.whitelistAdd({ player }).then(() => rcon.whitelist().then(handleOverviewWhitelist))
}
export const handleWhitelistRemove = (player: string) => {
  rcon.whitelistRemove({ player }).then(() => rcon.whitelist().then(handleOverviewWhitelist))
}
