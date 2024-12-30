import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore } from '@xstate/store'
import { useSelector } from '@xstate/store/react'
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { useEffect, useRef, useState } from 'react'

export type Server = {
  name: string
  host: string
  port: number
  password: string
}

const server = createStore({
  context: {
    name: 'My Server',
    host: '',
    port: 0,
    password: '',
  } satisfies Server,
  on: {
    change: (context, event: Server) => event,

    changeName: {
      name: (context, event: { name: string }) => event.name,
    },
    changeHost: {
      host: (context, event: { host: string }) => event.host,
    },
    changePort: {
      port: (context, event: { port: number }) => event.port,
    },
    changePassword: {
      password: (context, event: { password: string }) => event.password,
    },
  },
})

export const useServerName = () => useSelector(server, (state) => state.context.name)
export const useServerHost = () => useSelector(server, (state) => state.context.host)
export const useServerPort = () => useSelector(server, (state) => state.context.port)
export const useServerPassword = () => useSelector(server, (state) => state.context.password)

export const handleServerChange = (value: Server) => {
  server.send({ type: 'change', ...value })
}

export const useServerStorePersistence = () => {
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef(Promise.resolve())

  useEffect(() => {
    Promise.allSettled([
      AsyncStorage.getItem('settings.server.name'),
      AsyncStorage.getItem('settings.server.host'),
      AsyncStorage.getItem('settings.server.port'),
      getItemAsync('settings.server.password'),
    ])
      .then(([name, host, port, password]) => {
        if (name.status === 'fulfilled' && name.value) {
          server.send({ type: 'changeName', name: name.value })
        }
        if (host.status === 'fulfilled' && host.value) {
          server.send({ type: 'changeHost', host: host.value })
        }
        if (port.status === 'fulfilled' && port.value) {
          server.send({ type: 'changePort', port: Number(port.value) || 0 })
        }
        if (password.status === 'fulfilled' && password.value) {
          server.send({ type: 'changePassword', password: password.value })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })

    const subscription = server.subscribe((store) => {
      ref.current = ref.current.finally(() =>
        Promise.all([
          AsyncStorage.setItem('settings.server.name', store.context.name),
          AsyncStorage.setItem('settings.server.host', store.context.host),
          AsyncStorage.setItem('settings.server.port', String(store.context.port)),
          setItemAsync('settings.server.password', store.context.password),
        ]),
      )
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { isLoading }
}
