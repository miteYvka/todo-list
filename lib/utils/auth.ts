import { setIsAuth } from '@/context/auth'
import toast from 'react-hot-toast'
import { handleCloseAuthForm } from './common'

export const onAuthSucces = <T>(message: string, data: T) => {
    localStorage.setItem('auth', JSON.stringify(data))
    toast.success(message)
    handleCloseAuthForm()
    setIsAuth(true)
}