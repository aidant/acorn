import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { queryClient, useRcon } from '@/hooks/rcon'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { ButtonSmall } from './ui/button'
import { Input } from './ui/input'

const ServerWhitelistForm = ({ onAdd }: { onAdd: (player: string) => void }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
    },
  })

  return (
    <View className='flex flex-row items-center justify-between gap-4'>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            className='p-0 pb-2 border-0 border-b rounded-none flex-grow'
            type='text'
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='name'
        rules={{ required: true }}
      />
      <ButtonSmall
        onPress={handleSubmit((data) => {
          onAdd(data.name)
          reset()
        })}
      >
        Add
      </ButtonSmall>
    </View>
  )
}

export const ServerWhitelist = () => {
  const rcon = useRcon()

  const whitelist = useQuery({
    queryKey: ['rcon', 'minecraft', 'whitelist', 'list'],
    queryFn: () => {
      return rcon.whitelist()
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      whitelist.refetch()
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [whitelist.refetch])

  const whitelistAdd = useMutation({
    mutationKey: ['rcon', 'minecraft', 'whitelist', 'add'],
    mutationFn: (player: string) => {
      return rcon.whitelistAdd({ player })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rcon', 'minecraft', 'whitelist', 'list'],
      })
    },
  })

  const whitelistRemove = useMutation({
    mutationKey: ['rcon', 'minecraft', 'whitelist', 'remove'],
    mutationFn: (player: string) => {
      return rcon.whitelistRemove({ player })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rcon', 'minecraft', 'whitelist', 'list'],
      })
    },
  })

  return (
    <View className='w-full'>
      <Container className='px-6 py-4 flex flex-row items-center justify-between rounded-b-none'>
        <Text>Whitelist</Text>
        {/* <ButtonSmall onPress={console.log}>Add</ButtonSmall> */}
      </Container>
      <Container className='border-t-0 rounded-t-none px-6 py-4 gap-4 flex flex-col'>
        <ServerWhitelistForm onAdd={(player) => whitelistAdd.mutate(player)}></ServerWhitelistForm>
        {whitelist.data?.players.map((player) => {
          return (
            <View key={player} className='flex flex-row items-center justify-between'>
              <Text className='text-lg'>{player}</Text>
              <ButtonSmall
                onPress={() => {
                  Alert.alert(
                    `Remove player from whitelist`,
                    `Are you sure you want to remove ${player} from the whitelist`,
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      { text: 'OK', onPress: () => whitelistRemove.mutate(player) },
                    ],
                  )
                }}
              >
                Remove
              </ButtonSmall>
            </View>
          )
        })}
      </Container>
    </View>
  )
}
