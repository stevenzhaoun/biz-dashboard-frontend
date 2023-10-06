import { Permission } from "../types";
import client from "./client";

export const getPermissions = async () => {
    const { data } = await client.get('/permissions')
    return data as Permission[]
}