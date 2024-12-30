import { Container } from '@/components/ui/container'
import { useServerName } from '@/hooks/store'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Home() {
  const serverName = useServerName()

  return (
    <View className='flex-1 justify-center items-center p-4'>
      <View className='w-full'>
        <Text className='dark:text-white text-black'>Server</Text>
        <Container className='w-full'>
          <Text className='dark:text-white text-black'>{serverName}</Text>
          <Link href='/server-settings' className='dark:text-white text-black'>
            Edit server settings
          </Link>
        </Container>
      </View>
    </View>
  )
}
