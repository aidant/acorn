import { Text as NativeText, type TextProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export const Text = (props: TextProps) => {
  return (
    <NativeText
      {...props}
      className={twMerge('dark:text-white text-black text-base font-sans', props.className)}
    >
      {props.children}
    </NativeText>
  )
}
