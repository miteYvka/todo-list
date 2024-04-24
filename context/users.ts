import { getUsersFx } from "@/api/users"
import { Effect, createDomain, sample } from "effector"
import { Gate, createGate } from "effector-react"

const users = createDomain()
export const UsersGate = createGate()

const usersInstance = (effect: Effect<void, [], Error>) =>
    users
        .createStore([])
            .on(effect.done, (_, { result }) => result)
            .on(effect.fail, (_, { error }) => {
                console.log(error.message)
        })
const usersSampleInstance = (
        effect: Effect<void, [], Error>,
        gate: Gate<unknown>
    ) =>
        sample({
            clock: gate.open,
            target: effect,
        })
        
export const $users = usersInstance(getUsersFx)

usersSampleInstance(getUsersFx, UsersGate)
