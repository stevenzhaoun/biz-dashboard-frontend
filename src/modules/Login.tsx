import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { FormEvent, useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, loading, error } = useUser()
    const navigate = useNavigate()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/')
        } catch(e) {
            console.error(e)
        }
    }

    return <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height="80vh">

        <Typography variant="h3">Welcome</Typography>
        {error && <Typography color={'red'}>{error || "Something went wrong"}</Typography>}
        <Box component="form" width={500} onSubmit={handleSubmit}>
            <Box>
                <TextField label="Email" margin="normal" fullWidth required type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Box>
            <Box>
                <TextField label="Password" type="password" margin="normal" fullWidth required value={password} onChange={e => setPassword(e.target.value)} />
            </Box>
            <Box my={3}>
                <LoadingButton loading={loading} type="submit" fullWidth variant="contained">Login</LoadingButton>
            </Box>
        </Box>
    </Box>
}