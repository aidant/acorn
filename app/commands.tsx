import { useRcon } from '@/hooks/rcon'
import { minecraft, type Command } from '@lazy/rcon'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, TouchableHighlight, View } from 'react-native'

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
    console.log(commandId, command, data)
    const response = rcon?.[commandId as keyof typeof rcon](data as any)
    console.log(response)
    response?.then((response) => {
      console.log(response)
      setState(response)
    }, console.error)
  }

  return (
    <View>
      <Text className='dark:text-white text-black'>{commandId}</Text>
      {Object.entries(command.request.params || {}).map(([paramName, definition]) => {
        return (
          <View key={paramName}>
            <Text className='dark:text-white text-black'>{paramName}</Text>
            <Controller
              control={control}
              name={paramName}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='px-3 py-2 border dark:border-white border-black rounded-md dark:text-white text-black'
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              rules={{ required: true }}
            />
            {errors[paramName] && (
              <Text className='dark:text-white text-black'>{paramName} is required</Text>
            )}
          </View>
        )
      })}
      {Object.entries(state).map(([name, value]) => {
        return (
          <View key={name} style={{ display: 'flex' }}>
            <Text className='dark:text-white text-black'>{name}</Text>
            {Array.isArray(value) ? (
              <View>
                {value.map((value, index) => {
                  return (
                    <Text className='dark:text-white text-black' key={index}>
                      {value}
                    </Text>
                  )
                })}
              </View>
            ) : (
              <Text className='dark:text-white text-black'>{String(value)}</Text>
            )}
          </View>
        )
      })}
      <View>
        <TouchableHighlight
          className='px-3 py-2 dark:bg-white bg-black rounded-md'
          underlayColor='#FF0000'
          onPress={handleSubmit((data) => onSubmit(data))}
        >
          <View>
            <Text className='dark:text-black text-white text-center'>Run</Text>
          </View>
        </TouchableHighlight>
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
