import { ServerSettings } from '@/components/server-settings'
import {
  handleServerChange,
  useServerHost,
  useServerName,
  useServerPassword,
  useServerPort,
} from '@/hooks/store'
import { router } from 'expo-router'

export default function ServerSettingsPage() {
  const name = useServerName()
  const host = useServerHost()
  const port = useServerPort()
  const password = useServerPassword()

  return (
    <ServerSettings
      name={name}
      host={host}
      port={port}
      password={password}
      onSubmit={(server) => {
        handleServerChange(server)
        router.dismiss()
      }}
    ></ServerSettings>
  )
}
