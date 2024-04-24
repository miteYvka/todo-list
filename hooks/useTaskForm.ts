import { EventCallable, Store } from 'effector'
import { useForm } from 'react-hook-form'
import { ITask } from '@/type/task'

export const useTaskForm = (
    event: EventCallable<ITask>
  ) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ITask>()

  return {
    register,
    errors,
    handleSubmit,
  }
}