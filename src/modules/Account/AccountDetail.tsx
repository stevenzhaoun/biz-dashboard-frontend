import { Box, FormControl, TextField, Typography } from "@mui/material";
import useUser from "../../hooks/useUser";
import { LoadingButton } from "@mui/lab";
import { ChangeEvent, FormEvent, useState } from "react";
import { updatePassword } from "../../api/user.api";

const initialData = {
    password: '',
    confirmPassword: ''
}

export default function AccountDetail() {
    const { user } = useUser()
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(data.password !== data.confirmPassword) {
            setError("Password doesn't match")
        } else {
            setLoading(true)
            updatePassword((user?.id as number) , data.password).then(() => {
                setLoading(false)
            })
        }
    }

    const handleChange = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [fieldName]: e.target.value
        })
    }

    return <Box>
        <Typography variant="h4">Account</Typography>
        <Box my={3}>
            <Typography variant="body1">User Name: {user?.name}</Typography>
            <Typography variant="body1">User Email: {user?.email}</Typography>
        </Box>
        <Typography variant="h5">Update Password</Typography>
        {error && <Typography variant="body1">{error}</Typography>}
        <Box component="form" width={500} onSubmit={handleSubmit}>
            <Box>
                <TextField label="New Password" margin="normal" fullWidth required type="password" value={data.password} onChange={handleChange('password')} />
            </Box>
            <Box>
                <TextField label="Confirm Password" margin="normal" fullWidth required type="password" value={data.confirmPassword} onChange={handleChange('confirmPassword')} />
            </Box>

            <Box my={3}>
                <LoadingButton loading={loading} type="submit" fullWidth variant="contained"> Update </LoadingButton>
            </Box>
        </Box>
    </Box>
}