import { Text } from '@/components/ui/text'
import { useColorScheme } from 'nativewind'
import { TouchableHighlight, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

export const Button = (props: { className?: string; children: string; onPress: () => void }) => {
  const { colorScheme } = useColorScheme()

  return (
    <TouchableHighlight
      className={twMerge(
        'px-3 py-2 rounded-md dark:bg-lime-600 bg-lime-500 text-black dark:text-white border dark:border-lime-800 border-lime-300',
        props.className,
      )}
      underlayColor={colorScheme === 'dark' ? '#4d7c0f' : '#65a30d'}
      onPress={props.onPress}
    >
      <View>
        <Text className='text-white text-center'>{props.children}</Text>
      </View>
    </TouchableHighlight>
  )
}

export const ButtonSmall = (props: {
  className?: string
  children: string
  onPress: () => void
}) => {
  const { colorScheme } = useColorScheme()

  return (
    <TouchableHighlight
      className={twMerge('px-3 py-1 rounded-full border border-stone-700', props.className)}
      underlayColor={colorScheme === 'dark' ? '#44403c' : '#e7e5e4'}
      onPress={props.onPress}
    >
      <View>
        <Text className='dark:text-white text-black text-center'>{props.children}</Text>
      </View>
    </TouchableHighlight>
  )
}
