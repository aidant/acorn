import { useRcon } from '@/hooks/rcon'
import { minecraft, type Command } from '@lazy/rcon'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Text, TextInput, View } from 'react-native'

export function Command({ commandId, command }: { commandId: string; command: Command }) {
  const rcon = useRcon()
  const [state, setState] = useState({} as any)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: Object.fromEntries(
      Object.entries(command.request.params || {}).map(([paramName]) => [paramName, '']),
    ),
  })

  const onSubmit = (data: unknown) => {
    rcon?.[commandId as keyof typeof rcon](data as any)?.then(setState)
  }

  return (
    <View>
      <Text>{commandId}</Text>
      {Object.entries(command.request.params || {}).map(([paramName, definition]) => {
        return (
          <View key={paramName}>
            <Text>{paramName}</Text>
            <Controller
              control={control}
              name={paramName}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              rules={{ required: true }}
            />
            {errors[paramName] && <Text>{paramName} is required</Text>}
          </View>
        )
      })}
      {Object.entries(state).map(([name, value]) => {
        return (
          <View key={name} style={{ display: 'flex' }}>
            <Text>{name}</Text>
            {Array.isArray(value) ? (
              <View>
                {value.map((value, index) => {
                  return <Text key={index}>{value}</Text>
                })}
              </View>
            ) : (
              <Text>{String(value)}</Text>
            )}
          </View>
        )
      })}
      <View>
        <Button title='Run' onPress={handleSubmit((data) => onSubmit(data))} />
      </View>
    </View>
  )
}

export default function Commands() {
  return (
    <View>
      {Object.entries(minecraft).map(([commandId, command]) => {
        return <Command commandId={commandId} command={command} key={commandId}></Command>
      })}
    </View>
  )
}
