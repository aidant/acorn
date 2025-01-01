import { Input, type InputType } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form'
import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: {
    className?: string
    label: string
    type: InputType
    error: string | undefined
  } & Pick<ControllerProps<TFieldValues, TName>, 'control' | 'name' | 'rules'>,
) {
  return (
    <View className={twMerge('flex flex-col gap-1 w-full', props.className)}>
      <Text>{props.label}</Text>
      <Controller
        control={props.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type={props.type}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name={props.name}
        rules={props.rules}
      ></Controller>
      {props.error && <Text>{props.error}</Text>}
    </View>
  )
}
