'use client'
import { handleSignUp } from "@/context/auth"
import { $users, UsersGate } from "@/context/users"
import { useAuthRegistration } from "@/hooks/useAuthRegistration"
import { IAuthSideProps, ISignUpFx } from "@/type/auth"
import { IHeadUser } from "@/type/user"
import { useGate, useUnit } from "effector-react"

const AuthRegistration = ({ toggleAuth, isSideActive, }: IAuthSideProps) => {

    const { register, handleSubmit } = useAuthRegistration( isSideActive, handleSignUp )

    useGate(UsersGate)
    const users = useUnit($users)

    const submitForm = (data: ISignUpFx) => {
        handleSignUp({
            firstName: data.firstName,
            secondName: data.secondName,
            thirdName: data.thirdName,
            login: data.login,
            password: data.password,
            headUserId: data.headUserId
        })}

    const handleReload = () => {
        window.location.reload();
    }

    return (
        <div className="auth-registration">
            <div className="auth-container">
                <h2 className="auth-container__title">
                    Создать нового пользователя
                </h2>
                <form onSubmit={handleSubmit(submitForm)} className="auth-form">
                    <input 
                        type="text" 
                        className='auth-input' 
                        placeholder='Имя'
                        {...register('firstName')}
                    />
                    <input
                        type="text" 
                        className='auth-input' 
                        placeholder='Фамилия'
                    {...register('secondName')}
                    />
                    <input
                        type="text" 
                        className='auth-input' 
                        placeholder='Отчество'
                        {...register('thirdName')}
                    />
                    <input
                        type="text" 
                        className='auth-input' 
                        placeholder='Логин'
                        {...register('login')}
                    />
                    <input
                        type="password" 
                        className='auth-input' 
                        placeholder='Пароль'
                        {...register('password')}
                    />
                    <select {...register('headUserId')} className='auth-input-select'>
                        {/* <option value='' disabled selected>Вышестоящий:</option> */}
                        {users.map((user: IHeadUser) => (
                            <option key={user.id} value={user.id}>
                                {user.firstName} {user.thirdName}
                            </option>
                        ))}
                    </select>
                    <button className='auth-btn' type="submit" onClick={handleReload}>
                        Создать
                    </button>
                    <div className="auth-bottom">
                        <span className='auth-bottom-text'>
                            Существующий пользователь
                        </span>
                        <button type="button" className="auth-btn-swith" onClick={toggleAuth}>
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthRegistration