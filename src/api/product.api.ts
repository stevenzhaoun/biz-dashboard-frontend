import { Product } from "../types";
import client from "./client";

export const getProducts = async () => {
    const { data } = await client.get('/products')
    return data as Product[]
}

export const getProduct = async (productId: string) => {

    const { data } = await client.get(`/products/${productId}`)
    return data as Product
}

export const createProduct = async (productData: Product) => {
    const { data } = await client.post('/products', productData)
    return data as Product
}

export const updateProduct = async (productId:string, productData: Product) => {
    const { data } = await client.put(`/products/${productId}`, productData)
    return data as Product
}