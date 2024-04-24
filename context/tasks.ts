import { getTasksFx } from "@/api/main-page"
import { Effect, createDomain, sample } from "effector"
import { Gate, createGate } from "effector-react"

const tasks = createDomain()
export const TasksGate = createGate()

const tasksInstance = (effect: Effect<void, [], Error>) =>
    tasks
        .createStore([])
            .on(effect.done, (_, { result }) => result)
            .on(effect.fail, (_, { error }) => {
                console.log(error.message)
        })
const tasksSampleInstance = (
        effect: Effect<void, [], Error>,
        gate: Gate<unknown>
    ) =>
        sample({
            clock: gate.open,
            target: effect,
        })
export const $tasksT = tasksInstance(getTasksFx)

tasksSampleInstance(getTasksFx, TasksGate)
