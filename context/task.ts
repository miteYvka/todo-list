import { createDomain, sample } from "effector"
import toast from "react-hot-toast"
import { ITask } from "@/type/task"
import { createTaskFx, deleteTaskFx } from "@/api/main-page"

const task = createDomain()

export const handleCreateTask = task.createEvent<ITask>()
export const handleDeleteTask = task.createEvent<string>()

export const $task = task
    .createStore({})
    .on(createTaskFx.done, (_, { result }) => result)
    .on(createTaskFx.fail, (_, { error }) => {
      toast.error(error.message)
    })
    .on(deleteTaskFx.done, (_, { result }) => result)
    .on(deleteTaskFx.fail, (_, { error }) => {
      console.log(error.message)
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

sample({
    clock: handleDeleteTask,
    source: $task,
    fn: (_, data) => data,
    target: deleteTaskFx,
    })