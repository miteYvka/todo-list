import { createEffect } from "effector"
import api from './apiInstance' 
import toast from "react-hot-toast"
import { ITask } from "@/type/task"

export const getTasksFx = createEffect(async () => {
    const { data } = await api.get('/api/tasks/tasks')
    return data
})

export const createTaskFx = createEffect(
    async ({ headline, description, endDate, refreshDate, priority, status, createrId, responsibleId }: ITask) => {
        const { data } = await api.post('/api/tasks/create', {
            headline,
            description,
            endDate,
            refreshDate,
            priority,
            status,
            createrId,
            responsibleId,
        })

        if (data.warningMessage) {
            toast.error(data.warningMessage)
            return
        }
        return data
    }
)

export const deleteTaskFx = createEffect(async ( id: string ) => {
    const { data } = await api.post('/api/tasks/delete', { id })
    return data
})

