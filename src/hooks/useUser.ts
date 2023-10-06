import { loginApi } from "../api/login.api"
import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector"
import * as UserActions from '../slices/user'
import client from "../api/client"
import { useState } from "react"

const useUser = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const user = useAppSelector(state => {
        return state.user.user
    })

    const dispatch = useAppDispatch()

    const setUserData = (user: UserActions.UserState) => {
        localStorage.setItem('user', JSON.stringify(user))
        client.defaults.headers.common['Authorization'] = user.token
        dispatch(UserActions.login(user))
    }

    const login = async (email: string, password: string) => {
        setLoading(true)
        try {
            setError('')
            const data = await loginApi(email, password)
            setUserData(data.user)
            setLoading(false)
        } catch (e: any) {
            console.log(e)
            setError(e?.response.data)
            setLoading(false)
            throw e
        }
       
    }

    const logout = () => {
        dispatch(UserActions.logout())
        localStorage.removeItem('user')
        client.defaults.headers.common['Authorization'] = null
    }

    return {
        user,
        login,
        logout,
        loading,
        error,
        setUserData
    }
}

export default useUser