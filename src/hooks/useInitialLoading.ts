import { useNavigate } from "react-router-dom"
import useUser from "./useUser"
import { useEffect, useState } from "react"

const useInitialLoading = () => {
    const { user, setUserData } = useUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const userStr = localStorage.getItem('user')
        if (userStr) {
            if (!user) {
                const userData = JSON.parse(userStr)
                setUserData(userData)
                setLoading(false)
            }
        } else {
            if (!user) {
                setLoading(false)
                navigate('/login')

            }
        }
        setLoading(false)
    }, [user])

    return {
        loading
    }
}

export default useInitialLoading