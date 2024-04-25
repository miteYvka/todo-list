import { closeAuthForm, setIsAuth } from "@/context/auth"
import { handleDeleteTask } from "@/context/task"
import { loginCheck } from "@/context/user"
import { ITask } from "@/type/task"

export const today = new Date()

export const isDeadlineTask = (task : ITask) => {
    return convertToDate(task.endDate).getTime() < today.getTime()
}

export const colorTask = (task : ITask) => {
    if (task.status === 'Выполнена')
        return '-green'
    else if (convertToDate(task.endDate).getTime() < today.getTime())
        return '-red'
    else
        return ''
}

export const isCompletedTask = (task: ITask) => {
    return task.status === 'Выполнена'
}

export const convertToDate = (DateTimeString : string) => {
    const date = new Date(DateTimeString)
    return date
}

export const handleCloseAuthForm = () => closeAuthForm()

export const isUserAuth = () => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)

    if (!auth?.accessToken) {
        setIsAuth(false)
        return false
    }

    return true
}

export const triggerLoginCheck = () => {
    if (!isUserAuth()) {
        return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    loginCheck({ jwt: auth.accessToken })
}

export const submitCreateTask = (id: string | null | undefined) => {
    if (id)
        handleDeleteTask(id)
    window.location.reload()
}