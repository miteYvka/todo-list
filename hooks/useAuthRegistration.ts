import { EventCallable } from 'effector'
import { useForm } from 'react-hook-form'
import { ISignUpFx } from '@/type/auth'

export const useAuthRegistration = (
    isSideActive: boolean,
    event: EventCallable<ISignUpFx>
  ) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignUpFx>()

  return {
    register,
    errors,
    handleSubmit,
  }
}