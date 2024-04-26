'use client'
import { $tasksT, TasksGate } from "@/context/tasks"
import { ITask } from "@/type/task"
import { useGate, useUnit } from "effector-react"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import CreateTask from "./СreateTask"
import { colorTask, convertToDate, isDeadlineTask, today } from "@/lib/utils/common"
import { $users, UsersGate } from "@/context/users"
import { IHeadUser, IUser } from "@/type/user"
import { handleDeleteTask } from "@/context/task"
import { parseJwt } from "@/lib/utils/api-routes"

const MainTasks = () => {

  useGate(TasksGate)
  useGate(UsersGate)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const users = useUnit($users)
  const tasks = useUnit($tasksT)
  const [isAddTask, setAddTask ] = useState(false)
  const [filter, setFilter] = useState('full')
  const toggleAddTask = () => setAddTask(!isAddTask)
  const [isAdmin, setAdmin] = useState(false)
  const toggleAdmin = () => setAdmin(!isAdmin)


  const getUserNameForResponsibleId = (id : string) => {
    const user = users.filter((user: IHeadUser) => user !== undefined && user.id === id)
    if (user[0])
      return (user[0] as IHeadUser).firstName + ' ' +(user[0] as IHeadUser).thirdName
    else return 'Пользователь удален'
  }

  const [FormData, setFormData] = useState<ITask>({
    id: '',
    headline: '',
    description: '',
    endDate: today.toISOString(),
    priority: 'Высокий',
    status: 'К выполнению',
    responsibleId: '',
    createrId: '',
    refreshDate: ''
  })

  const [selectedTask, setSelectedTask] = useState<ITask | null>()
  const toggleSelectTask = (task: ITask) => setSelectedTask(task)
  
  const isThisTask = (task: ITask) => task === selectedTask

  const deleteTask = () => {
    if (selectedTask && selectedTask.id) {
        handleDeleteTask(selectedTask.id)
        setSelectedTask(null)
        window.location.reload()
    }
  }

  const editTask = () => {
    if (selectedTask)
    setFormData(selectedTask)
    setAddTask(true)
  }

  const converToDateToView = (DateTimeString : string) => {
    const dateObject = new Date(DateTimeString)
    return `${dateObject.getDate().toString().padStart(2, '0')}.${(dateObject.getMonth() + 1).toString().padStart(2, '0')}.${dateObject.getFullYear()}`
  }

  const filterTasksOnEndDate = (task: ITask) => {
    if (filter === 'today' && !isDeadlineTask(task) && task.status !== 'Выполнена')
      return (convertToDate(task.endDate).getTime() - today.getTime()) < 86400010
    else if (filter === 'week' && !isDeadlineTask(task) && task.status !== 'Выполнена')
      return (convertToDate(task.endDate).getTime() - today.getTime()) < 604800010
    else if (filter === 'other' && !isDeadlineTask(task) && task.status !== 'Выполнена') 
      return true
    else if (filter === 'deadline')
      return isDeadlineTask(task) && task.status !== 'Выполнена'
    else if (filter === 'full') return true
  }

  const handleChangeFilter = (e :ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }

  return (
    <div className="mp-container">
      <div className="mp-fullback">
        <div className="mp-header">
          <button className={`mp-btn-add${isAddTask?'-on':''}`} onClick={toggleAddTask}>
            Создать задачу
          </button>
          <div className="mp-form-radio-list">
            <input
              type="radio"
              id="today"
              name="filter"
              value="today"
              className="mp-form-radio"
              checked={filter === 'today'}
              onChange={handleChangeFilter}/>
            <label htmlFor="today">{'< '}24 часа</label>
            <input
              type="radio"
              id="week"
              name="filter"
              value="week"
              className="mp-form-radio"
              checked={filter === 'week'}
              onChange={handleChangeFilter}/>
            <label htmlFor="week">{'< '}7 дней</label>
            <input
              type="radio"
              id="other"
              name="filter"
              value="other"
              className="mp-form-radio"
              checked={filter === 'other'}
              onChange={handleChangeFilter}/>
            <label htmlFor="other">Все активные</label>
            <input
              type="radio"
              id="deadline"
              name="filter"
              value="deadline"
              className="mp-form-radio"
              checked={filter === 'deadline'}
              onChange={handleChangeFilter}/>
            <label htmlFor="deadline">Просроченные</label>
            <input
              type="radio"
              id="full"
              name="filter"
              value="full"
              className="mp-form-radio"
              checked={filter === 'full'}
              onChange={handleChangeFilter}/>
            <label htmlFor="full">Полный список</label>
          </div>
          
            {selectedTask &&
              <div className="mp-btn-selected">
                <button className="mp-btn-edit" onClick={editTask}>
                  Редактировать
                </button>
                {isAdmin && <button className="mp-btn-delete" onClick={deleteTask}>
                  Удалить
                </button>}
              </div>}
              <div className="mp-btns-admin-container">
          <label>Руководитель</label>
          <div className="mp-btn-admin-duo">
          <button 
              className={`mp-btn-admin ${isAdmin && 'btn-active'}`}
              onClick={toggleAdmin}>Да</button>
          <button 
              className={`mp-btn-admin ${!isAdmin && 'btn-active'}`}
              onClick={toggleAdmin}>Нет</button>
              </div>
        </div>
        </div>
        
        <table className="mp-table">
          <thead>
            <tr>
              <th className="mp-table-th">Заголовок</th>
              <th className="mp-table-th">Описание</th>
              <th className="mp-table-th">Дата окончания</th>
              <th className="mp-table-th">Дата обновления</th>
              <th className="mp-table-th">Приоритет</th>
              <th className="mp-table-th">Статус</th>
              <th className="mp-table-th">Создатель</th>
              <th className="mp-table-th">Ответственный</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter(filterTasksOnEndDate)
              .sort((taskA: ITask, taskB: ITask) => new Date(taskB.refreshDate).getTime() - new Date(taskA.refreshDate).getTime())
              .map((task: ITask) => (
                <tr key={task.id} onClick={() => toggleSelectTask(task)} className={`${isThisTask(task)&&'mp-select-item'}`}>
                  <td className={`mp-table-td${colorTask(task)}`}>{task.headline}</td>
                  <td className={`mp-table-td${colorTask(task)}`}>{task.description}</td>
                  <td className={`mp-table-td${colorTask(task)}`}>{converToDateToView(task.endDate)}</td>
                  <td className={`mp-table-td${colorTask(task)}`}>{converToDateToView(task.refreshDate)}</td>
                  <td className={`mp-table-td${colorTask(task)}`}>{task.priority}</td>
                  <td className={`mp-table-td${colorTask(task)}`}>{task.status}</td>
                  <td className={`mp-table-td${colorTask(task)}`}>{getUserNameForResponsibleId(task.createrId)}</td>
                  <td className={`mp-table-td${colorTask(task)}`}>{getUserNameForResponsibleId(task.responsibleId)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isAddTask && <CreateTask createFormProps={{ task: FormData, isAdmin: isAdmin, toClose: toggleAddTask }} />}  
    </div>
  )
}

export default MainTasks