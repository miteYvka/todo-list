import { createEffect } from "effector"
import api from './apiInstance' 

export const getUsersFx = createEffect(async () => {
    const { data } = await api.get('/api/users/list')
    return data
})
