'use client'
import { useGate, useUnit } from "effector-react";
import { useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'
import { handleCreateTask } from "@/context/task";
import { $users, UsersGate } from "@/context/users";
import { useTaskForm } from "@/hooks/useTaskForm";
import { parseJwt } from "@/lib/utils/api-routes";
import { ICreateTaskProps, ITask } from "@/type/task";
import { IHeadUser } from "@/type/user";
import { submitCreateTask, today } from "@/lib/utils/common";

const CreateTask = ({createFormProps}:{createFormProps:ICreateTaskProps}) => {
  useGate(UsersGate)

  const users = useUnit($users)

  const formData = createFormProps.task
  const [headline, setHeadline] = useState(formData.headline)
  const [description, setDescriptions] = useState(formData.description)
  const [endDate, setEndDate] = useState(formData.endDate)
  const [priority, setPriority] = useState(formData.priority)
  const [status, setStatus] = useState(formData.status)
  const [responsibleId, setResponsibleId] = useState(formData.responsibleId)

  const stringDateInDate = (date: string) => new Date(date)
  const dateInDatePicker = (date: Date) => format(date, 'dd/MM/yyyy')

  const { register, handleSubmit } = useTaskForm(handleCreateTask)

  const getUserIdForLogin = () => {
    const user = users.filter((user: IHeadUser) => user !== undefined && user.login === parseJwt(localStorage.getItem('auth') as string).login)
    if (user[0])
      return (user[0] as IHeadUser).id
    else return 'no-id'
  }

  const submitForm = (data: ITask) => {
    setHeadline(data.headline);
    setDescriptions(data.description);
    setPriority(data.priority);
    setStatus(data.status);
    setResponsibleId(data.responsibleId);
    handleCreateTask({
      headline: headline,
      description: description,
      endDate: endDate,
      refreshDate: today.toISOString(),
      priority: priority,
      status: status,
      createrId: getUserIdForLogin(),
      responsibleId: responsibleId
    })}

  return (
    <div className="ct-container">
      {createFormProps.isAdmin ? 
        <form className="mp-form" onSubmit={handleSubmit(submitForm)}>
        <input 
          type="text" 
          className="mp-element-input title" 
          placeholder="Заголовок" 
          value={headline}
          onChange={(e) => {
            setHeadline(e.target.value)
            register('headline')
          }}/>
        <input
          type="text"
          className="mp-element-input description"
          placeholder="описание"
          value={description}
          onChange={(e) => {
            setDescriptions(e.target.value)
            register('description')
          }}/>
        <div>
          <DatePicker
            className="mp-element-input-date date"
            dateFormat="dd/MM/yyyy"
            value={dateInDatePicker(stringDateInDate(endDate))}
            selected={stringDateInDate(endDate)}
            onChange={(date) => {
              if (date !== null) {
                setEndDate(date.toISOString())
                register('endDate')
              }
            }}/>
          <span className="ct-date-label">Дата завершения</span>
        </div>
        <div>
          <select
            className="mp-element-input priority"
            value={priority}
            onChange={(priority) => {
              setPriority(priority.target.value)
              register('priority')
            }}>
              <option value="Высокий">Высокий</option>
              <option value="Средний">Средний</option>
              <option value="Средний">Низкий</option>
          </select>
          <select
            className="mp-element-input status"
            value={status}
            onChange={(status) => {
              setStatus(status.target.value)
              register('status')
            }}>
            <option value="К выполнению">К выполнению</option>
            <option value="Выполняется">Выполняется</option>
            <option value="Выполнена">Выполнена</option>
            <option value="Отменена">Отменена</option>
          </select>
        </div>
        <select
          value={responsibleId}
          className='mp-element-input responsible'
          onChange={(e) => {
            setResponsibleId(e.target.value)
            register('responsibleId')
          }}>
            {users.map((user: IHeadUser) => (
              <option key={user.id} value={user.id}>
                  {user.firstName} {user.thirdName}
              </option>
            ))}
        </select>
        <button type='submit' className="mp-btn-create" onClick={() => submitCreateTask(formData.id)}>Создать/Редактировать</button>
        <button className="mp-btn-create" onClick={createFormProps.toClose}>Закрыть</button>
      </form>:
      <form className="form-no-admin">
        <div>
        <select
            className="mp-element-input status"
            value={status}
            onChange={(status) => {
              setStatus(status.target.value)
              register('status')
            }}>
            <option value="К выполнению">К выполнению</option>
            <option value="Выполняется">Выполняется</option>
            <option value="Выполнена">Выполнена</option>
            <option value="Отменена">Отменена</option>
          </select>
          <span> Статус </span>
        </div>
          <div>
          <button type='submit' className="mp-btn-create" onClick={() => submitCreateTask(formData.id)}>Редиктировать</button>
          <button className="mp-btn-create" onClick={createFormProps.toClose}>Закрыть</button>
          </div>
      </form>}
    </div>
  )
}

export default CreateTask