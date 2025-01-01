import { TextInput, type TextInputProps } from 'react-native'

export type InputType = 'text' | 'number' | 'password' | 'url'

export const Input = ({
  type,
  ...props
}: { type: InputType } & Pick<TextInputProps, 'onBlur' | 'onChangeText' | 'value'>) => {
  return (
    <TextInput
      className='px-3 py-2 border dark:border-stone-700 border-stone-200 rounded-md dark:text-white text-black text-base font-sans'
      secureTextEntry={type === 'password'}
      autoCapitalize={type === 'text' ? 'sentences' : 'none'}
      keyboardType={({ number: 'numeric', url: 'url' } as const)[type as string] || 'default'}
      {...props}
    />
  )
}
