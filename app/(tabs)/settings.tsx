import { useServer, useServerMutation } from '@/hooks/settings'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

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
      host: data?.host,
      port: typeof data?.port === 'number' ? String(data.port) : '',
      password: data?.password,
    },
  })

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text>Host</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
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
        {errors.host && <Text>{'Host is required'}</Text>}
      </View>

      <View style={styles.container}>
        <Text>Port</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
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
        {errors.port && <Text>{'Port must be a number between 0 and 65535'}</Text>}
      </View>

      <View style={styles.container}>
        <Text>Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
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
        {errors.password && <Text>{'Password is required'}</Text>}
      </View>

      <View style={styles.container}>
        <Button
          title='Save'
          onPress={handleSubmit((data) =>
            onSubmit({ host: data.host, port: Number(data.port), password: data.password }),
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
})
