import { createDomain, sample } from "effector"
import toast from "react-hot-toast"
import { signInFx, signUpFx } from "@/api/auth"
import { ISignUpFx, ISignInFx } from "@/type/auth"

const auth = createDomain()

export const openAuthForm = auth.createEvent()
export const closeAuthForm = auth.createEvent()
export const handleSignUp = auth.createEvent<ISignUpFx>()
export const handleSignIn = auth.createEvent<ISignInFx>()
export const setIsAuth = auth.createEvent<boolean>()

export const $openAuthForm = auth
    .createStore<boolean>(false)
    .on(openAuthForm, () => true)
    .on(closeAuthForm, () => false)

export const $isAuth = auth
    .createStore(false)
    .on(setIsAuth, (_, isAuth) => isAuth)

export const $auth = auth
    .createStore({})
    .on(signUpFx.done, (_, { result }) => result)
    .on(signUpFx.fail, (_, { error }) => {
      toast.error(error.message)
    })
    .on(signInFx.done, (_, { result }) => result)
    .on(signInFx.fail, (_, { error }) => {
      toast.error(error.message)
    })

sample({
    clock: handleSignUp,
    source: $auth,
    fn: (_, { firstName, secondName, thirdName, login, password, headUserId }) => ({
        firstName,
        secondName,
        thirdName,
        login,
        password,
        headUserId
    }),
    target: signUpFx,
    })
      
sample({
    clock: handleSignIn,
    source: $auth,
    fn: (_, { login, password }) => ({
        login,
        password
    }),
    target: signInFx,
    })