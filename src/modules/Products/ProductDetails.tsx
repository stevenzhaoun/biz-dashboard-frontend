import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Product, Role, User } from "../../types";
import { createUser, getUser, updateUser } from "../../api/user.api";
import { getRoles } from "../../api/roles.api";
import { createProduct, getProduct, updateProduct } from "../../api/product.api";

const initialData: Product = {
    title: '',
    description: '',
    price: 0,
}

export default function ProductDetails() {
    const params = useParams<{ id: string }>()
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const isAdd = params.id === 'add'

    const productId = params.id as string

    useEffect(() => {
        if (!isAdd) {
            setLoading(true)
            getProduct(productId).then(data => {
                setData(data)
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [isAdd])

    const handleChange = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [fieldName]: fieldName === 'price' ? Number(e.target.value) : e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        if (isAdd) {
            await createProduct(data)
        } else {
            await updateProduct(productId, data)
        }
        setSubmitting(false)
    }

    if (loading) {
        return <CircularProgress />
    }

    return <Box>
        <Typography>{isAdd ? 'Create Product' : `Prodcut ${data.title}`}</Typography>
        <Box component="form" width={500} onSubmit={handleSubmit}>
            <Box>
                <TextField label="Title" margin="normal" fullWidth required value={data.title} onChange={handleChange('title')} />
            </Box>
            <Box>
                <TextField label="Title" margin="normal" fullWidth required value={data.description} onChange={handleChange('description')} />
            </Box>
            <Box>
                <TextField label="Title" margin="normal" type="number" fullWidth required value={data.price} onChange={handleChange('price')} />
            </Box>
        
            <Box my={3}>
                <LoadingButton loading={submitting} type="submit" fullWidth variant="contained">{isAdd ? 'Create' : 'Update'} </LoadingButton>
            </Box>
        </Box>
    </Box>
}