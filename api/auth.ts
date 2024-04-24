import { createEffect } from "effector"
import toast from "react-hot-toast"
import api from './apiInstance'
import { onAuthSucces } from "@/lib/utils/auth"
import { ISignInFx, ISignUpFx } from "@/type/auth"

export const signUpFx = createEffect(
    async ({ firstName, secondName, thirdName, login, password, headUserId }: ISignUpFx) => {
        const { data } = await api.post('/api/users/signup', {
            firstName,
            secondName,
            thirdName,
            login,
            password,
            headUserId
        })

        if (data.warningMessage) {
            toast.error(data.warningMessage)
            return
        }

        onAuthSucces('Пользователь создан', data)
        return data
    }
)

export const signInFx = createEffect(
    async ({ login, password }: ISignInFx ) => {
        const { data } = await api.post('/api/users/login', {
            login,
            password
        })

        if (data.warningMessage) {
            toast.error(data.warningMessage)
            return
        }

        onAuthSucces('Вход выполнен успешно', data)
        return data
    }
)

