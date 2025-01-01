import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'

export const Indicator = (props: { enabled: boolean }) => {
  return (
    <View
      className={twMerge(
        'w-5 h-5 mr-2 rounded-full flex items-center justify-center',
        props.enabled ? 'dark:bg-lime-600/25 bg-lime-300' : 'dark:bg-rose-600/25 bg-rose-300',
      )}
    >
      <View
        className={twMerge(
          'w-2.5 h-2.5 rounded-full',
          props.enabled ? 'dark:bg-lime-600 bg-lime-500 ' : 'dark:bg-rose-600 bg-rose-500 ',
        )}
      ></View>
    </View>
  )
}
