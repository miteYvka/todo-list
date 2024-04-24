import { createEffect } from "effector"
import api from './apiInstance' 

export const getTasksFx = createEffect(async () => {
    const { data } = await api.get('/api/tasks/tasks')
    return data
})