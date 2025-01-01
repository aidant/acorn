import { Text } from '@/components/ui/text'
import { TouchableHighlight, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

export const Button = (props: { className?: string; children: string; onPress: () => void }) => {
  return (
    <TouchableHighlight
      className={twMerge(
        'px-3 py-2 rounded-md dark:bg-lime-600 bg-lime-500 text-black dark:text-white border dark:border-lime-800 border-lime-300',
        props.className,
      )}
      underlayColor='#4d7c0f'
      onPress={props.onPress}
    >
      <View>
        <Text className='text-white text-center'>{props.children}</Text>
      </View>
    </TouchableHighlight>
  )
}
