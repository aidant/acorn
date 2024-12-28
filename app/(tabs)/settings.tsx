import { useServer, useServerMutation } from '@/hooks/settings'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, TouchableHighlight, View } from 'react-native'

export default function Settings() {
  const { data, isLoading } = useServer()
  const { mutate: onSubmit } = useServerMutation()

  if (!isLoading) {
    return <Form data={data} onSubmit={onSubmit}></Form>
  }
}

export function Form({
  data,
  onSubmit,
}: {
  data?: { host: string; port: number; password: string }
  onSubmit: (data: { host: string; port: number; password: string }) => void
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      host: data?.host || '',
      port: typeof data?.port === 'number' ? String(data.port) : '',
      password: data?.password || '',
    },
  })

  return (
    <View className='flex flex-col gap-4 justify-center items-center p-4 flex-1'>
      <View className='flex flex-row w-full gap-4'>
        <View className='flex flex-col flex-grow'>
          <Text className='dark:text-white text-black'>Host</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='px-3 py-2 border dark:border-white border-black rounded-md dark:text-white text-black'
                keyboardType='url'
                autoCapitalize='none'
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name='host'
            rules={{ required: true }}
          ></Controller>
          {errors.host && <Text className='dark:text-white text-black'>{'Host is required'}</Text>}
        </View>

        <View className='flex flex-col flex-shrink max-w-36 w-full'>
          <Text className='dark:text-white text-black'>Port</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='px-3 py-2 border dark:border-white border-black rounded-md dark:text-white text-black'
                keyboardType='numeric'
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name='port'
            rules={{
              required: true,
              validate: (value) =>
                !Number.isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 65535,
            }}
          ></Controller>
          {errors.port && (
            <Text className='dark:text-white text-black'>
              {'Port must be a number between 0 and 65535'}
            </Text>
          )}
        </View>
      </View>

      <View className='flex flex-col w-full'>
        <Text className='dark:text-white text-black'>Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='px-3 py-2 border dark:border-white border-black rounded-md dark:text-white text-black'
              secureTextEntry={true}
              keyboardType='visible-password'
              autoCapitalize='none'
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name='password'
          rules={{ required: true }}
        ></Controller>
        {errors.password && (
          <Text className='dark:text-white text-black'>{'Password is required'}</Text>
        )}
      </View>

      <View className='flex flex-col w-full'>
        <TouchableHighlight
          className='px-3 py-2 dark:bg-white bg-black rounded-md'
          underlayColor='#FF0000'
          onPress={handleSubmit((data) =>
            onSubmit({ host: data.host, port: Number(data.port), password: data.password }),
          )}
        >
          <View>
            <Text className='dark:text-black text-white text-center'>Save</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}
