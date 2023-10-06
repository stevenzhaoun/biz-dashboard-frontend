import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Role, User } from "../../types";
import { createUser, getUser, updateUser } from "../../api/user.api";
import { getRoles } from "../../api/roles.api";

const initialData: User = {
    name: '',
    email: '',
    roleId: 2,
}

export default function UserDetail() {
    const params = useParams<{ id: string }>()
    const [data, setData] = useState(initialData);
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const isAdd = params.id === 'add'

    const userId = params.id as string

    useEffect(() => {
        if (!isAdd) {
            setLoading(true)
            getUser(userId).then(data => {
                setData(data)
            }).finally(() => {
                setLoading(false)
            })
        }
        getRoles().then(data => {
            setRoles(data)
        })
    }, [isAdd])

    const handleChange = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        if (isAdd) {
            await createUser(data)
        } else {
            await updateUser(userId, data)
        }
        setSubmitting(false)
    }

    const handleRoleChange = (e: SelectChangeEvent<number>) => {
        setData({
            ...data,
            roleId: Number(e.target.value)
        })
    }

    if (loading) {
        return <CircularProgress />
    }

    return <Box>
        <Typography>{isAdd ? 'Create NewUser' : `User ${data.name}`}</Typography>
        <Box component="form" width={500} onSubmit={handleSubmit}>
            <Box>
                <TextField label="Name" margin="normal" fullWidth required value={data.name} onChange={handleChange('name')} />
            </Box>
            <Box>
                <TextField label="Email" margin="normal" fullWidth required type="email" value={data.email} onChange={handleChange('email')} />
            </Box>
            <FormControl fullWidth>
                <InputLabel id="role-select-label">Age</InputLabel>
                <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={data.roleId}
                    label="Role"
                    onChange={handleRoleChange}
                >
                    {roles.map(role => <MenuItem value={role.id} key={role.id}>{role.name}</MenuItem>)}
                </Select>
            </FormControl>
            <Box my={3}>
                <LoadingButton loading={submitting} type="submit" fullWidth variant="contained">{isAdd ? 'Create' : 'Update'} </LoadingButton>
            </Box>
        </Box>
    </Box>
}