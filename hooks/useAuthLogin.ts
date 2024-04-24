import { ISignInFx } from '@/type/auth'
import { EventCallable } from 'effector'
import { useForm } from 'react-hook-form'

export const useAuthLogin = (
  event: EventCallable<ISignInFx>
) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInFx>()

  return {
    register,
    errors,
    handleSubmit,
  }
}