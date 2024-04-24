import { createDomain, createEffect, sample } from "effector"
import toast from "react-hot-toast"
import api from '../api/apiInstance'
import { ITask } from "@/type/task"

export const createTaskFx = createEffect(
    async ({ headline, description, endDate, refreshDate, priority, status, createrId,responsibleId }: ITask) => {
        const { data } = await api.post('/api/tasks/create', {
            headline,
            description,
            endDate,
            refreshDate,
            priority,
            status,
            createrId,
            responsibleId
        })

        if (data.warningMessage) {
            toast.error(data.warningMessage)
            return
        }
        return data
    }
)

const task = createDomain()

export const handleCreateTask = task.createEvent<ITask>()

export const $task = task
    .createStore({})
    .on(createTaskFx.done, (_, { result }) => result)
    .on(createTaskFx.fail, (_, { error }) => {
      toast.error(error.message)
    })

sample({
    clock: handleCreateTask,
    source: $task,
    fn: (_, {headline, description, endDate, refreshDate, priority, status, createrId, responsibleId }) => ({
        headline,
        description,
        endDate,
        refreshDate,
        priority,
        status,
        createrId,
        responsibleId
    }),
    target: createTaskFx,
    })