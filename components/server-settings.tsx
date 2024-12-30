import { Button } from '@/components/ui/button'
import { type Server } from '@/hooks/store'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { FormInput } from './form-input'

export function ServerSettings(props: Server & { onSubmit: (server: Server) => void }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: props.name,
      host: props.host,
      port: props.port === 0 ? '' : String(props.port),
      password: props.password,
    },
  })

  return (
    <View className='flex flex-col gap-4 justify-center items-center p-4 flex-1'>
      <FormInput
        type='text'
        name='name'
        label='Name'
        control={control}
        error={errors.name && 'Name is required'}
        rules={{ required: true }}
      />

      <View className='flex flex-row w-full gap-4'>
        <FormInput
          className='flex-grow w-auto'
          type='url'
          name='host'
          label='Host'
          control={control}
          error={errors.host && 'Host is required'}
          rules={{ required: true }}
        />

        <FormInput
          className='w-auto'
          type='number'
          name='port'
          label='Port'
          control={control}
          error={errors.port && 'Port must be a number between 0 and 65535'}
          rules={{
            required: true,
            validate: (value) =>
              !Number.isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 65535,
          }}
        />
      </View>

      <FormInput
        type='password'
        name='password'
        label='Password'
        control={control}
        error={errors.password && 'Password is required'}
        rules={{ required: true }}
      />

      <View className='flex flex-col w-full'>
        <Button
          onPress={handleSubmit((data) =>
            props.onSubmit({
              name: data.name,
              host: data.host,
              port: Number(data.port),
              password: data.password,
            }),
          )}
        >
          Save
        </Button>
      </View>
    </View>
  )
}
