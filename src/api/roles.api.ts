import { Role } from "../types";
import client from "./client";

export const getRoles = async () => {
    const { data } = await client.get('/roles')
    return data as Role[]
}