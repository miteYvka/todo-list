'use client'
import { useState } from "react"
import AuthRegistration from "./AuthRegistration"
import AuthLogin from "./AuthLogin"
import { useGate } from "effector-react"
import { UsersGate } from "@/context/users"
import { Toaster } from "react-hot-toast"

const Auth = () => {

const [isAuthSwitched, setIsAuthSwitched] = useState(false)
const [isSignInActive, setIsSignInActive] = useState(false)
const [isSignupActive, setIsSignupActive] = useState(false)

useGate(UsersGate)

const toggleAuth = () => {
    setIsAuthSwitched(!isAuthSwitched)
    setIsSignInActive(!isSignInActive)
    setIsSignupActive(!isSignupActive)
}
    return (
        
        <div className='auth'>
            {isSignInActive ? 
                <AuthRegistration 
                    toggleAuth={toggleAuth} 
                    isSideActive={isSignupActive}/> :
                <AuthLogin 
                    toggleAuth={toggleAuth} 
                    isSideActive={isSignInActive}/>}
                
        </div>
    )
}

export default Auth