import { User } from "../types";
import client from "./client";

export const getUsers = async () => {
    const { data } = await client.get('/users')
    return data as User[]
}

export const getUser = async (userId: string) => {

    const { data } = await client.get(`/users/${userId}`)
    return data as User
}

export const createUser = async (userData: User) => {
    const { data } = await client.post('/users', userData)
    return data as User
}

export const updateUser = async (userId:string, userData: User) => {
    const { data } = await client.put(`/users/${userId}`, userData)
    return data as User
}

export const updatePassword = async(userId: number, password: string) => {
    const { data } = await client.put('/auth/update-password', {
        userId,
        password
    })
    return data
}