'use client'
import { handleSignIn } from "@/context/auth"
import { useAuthLogin } from "@/hooks/useAuthLogin"
import { IAuthSideProps, ISignInFx, } from "@/type/auth"

const AuthLogin = ({ toggleAuth }: IAuthSideProps) => {

    const { register, handleSubmit } = useAuthLogin( handleSignIn )

    const submitForm = (data: ISignInFx) => {
        if (data.login !== undefined && data.password !== undefined) {
            handleSignIn({
                login: data.login,
                password: data.password,
            })}}

    const handleReload = () => {
        window.location.reload();
    }

    return (
        <div className="auth-login">
            <div className="auth-container">
                <h2 className="auth-container__title">
                    Войти
                </h2>
                <form onSubmit={handleSubmit(submitForm)} className="auth-form">
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
                    <button className='auth-btn' type="submit" >
                        Войти
                    </button>
                    <div className="auth-bottom">
                        <span className='auth-bottom-text'>
                            Нет аккаунта 
                        </span>
                        <button type="button" className="auth-btn-swith" onClick={toggleAuth}>
                            Создать
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthLogin