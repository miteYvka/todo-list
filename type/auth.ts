export interface ISignUpFx {
    firstName: string
    secondName: string
    thirdName: string
    login: string
    password: string
    headUserId: string  
}

export interface ISignInFx {
    login: string
    password: string
}

export interface IAuthSideProps {
    toggleAuth: VoidFunction
    isSideActive: boolean
}
