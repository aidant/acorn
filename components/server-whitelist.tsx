import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { handleWhitelistAdd, handleWhitelistRemove } from '@/hooks/rcon'
import { useOverviewWhitelist } from '@/hooks/store-overview'
import * as React from 'react'
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
  const whitelist = useOverviewWhitelist()

  return (
    <View className='w-full'>
      <Container className='px-6 py-4 flex flex-row items-center justify-between rounded-b-none'>
        <Text className='text-lg'>Whitelist</Text>
      </Container>
      <Container className='border-t-0 rounded-t-none px-6 py-4 gap-4 flex flex-col'>
        <ServerWhitelistForm onAdd={(player) => handleWhitelistAdd(player)}></ServerWhitelistForm>
        {whitelist?.map((player) => {
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
                      { text: 'Remove', onPress: () => handleWhitelistRemove(player) },
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
