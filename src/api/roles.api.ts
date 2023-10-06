import { Role, RolePayload } from "../types";
import client from "./client";

export const getRoles = async () => {
    const { data } = await client.get('/roles')
    return data as Role[]
}

export const getRole = async (roleId: string) => {
    const { data } = await client.get(`/roles/${roleId}`)
    return data as Role
}

export const createRole = async (roleData: RolePayload) => {
    const { data } = await client.post('/roles', roleData)
    return data as Role
}

export const updateRole = async (roleId:string, roleData: RolePayload) => {
    const { data } = await client.put(`/roles/${roleId}`, roleData)
    return data as Role
}