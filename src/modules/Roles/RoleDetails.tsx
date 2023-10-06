import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Permission, RolePayload } from "../../types";
import { createRole, getRole, updateRole } from "../../api/roles.api";
import { getPermissions } from "../../api/permission.api";

const initialData: RolePayload = {
    name: '',
    permissions: []
}

export default function RoleDetail() {
    const params = useParams<{ id: string }>()
    const [data, setData] = useState(initialData);
    const [permissions, setPermissions] = useState<Permission[]>([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const isAdd = params.id === 'add'

    const roleId = params.id as string

    useEffect(() => {
        if (!isAdd) {
            setLoading(true)
            getRole(roleId).then(data => {
                setData({
                    ...data,
                    permissions: data.permissions?.map(p => p.id) || []
                })
            }).finally(() => {
                setLoading(false)
            })
        }
        getPermissions().then(data => {
            setPermissions(data)
        })
    }, [isAdd])

    const handleChange = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        if (isAdd) {
            await createRole(data)
        } else {
            await updateRole(roleId, data)
        }
        setSubmitting(false)
    }

    const handleCheckboxToggle = (permissionId: number) => {
        const currPermissionIds = data.permissions
        const hasPermission = currPermissionIds?.includes(permissionId)
        if(hasPermission) {
            setData({
                ...data,
                permissions: data.permissions?.filter(p => p !== permissionId)
            })
        } else {
            setData({
                ...data,
                permissions: [...(data.permissions || []), permissionId]
            })
        }
    };

    if (loading) {
        return <CircularProgress />
    }

    return <Box>
        <Typography>{isAdd ? 'Create Role' : `Role ${data.name}`}</Typography>
        <Box component="form" width={500} onSubmit={handleSubmit}>
            <Box>
                <TextField label="Name" margin="normal" fullWidth required value={data.name} onChange={handleChange('name')} />
            </Box>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Permissions</FormLabel>
                <FormGroup>
                    {permissions.map((p => {
                        return <FormControlLabel
                            key={p.id}
                            control={
                                <Checkbox checked={Boolean(data.permissions?.find(dp => dp === p.id))} onChange={() => handleCheckboxToggle(p.id)} name="permission" />
                            }
                            label={p.name}
                        />
                    }))}

                </FormGroup>
            </FormControl>
            <Box my={3}>
                <LoadingButton loading={submitting} type="submit" fullWidth variant="contained">{isAdd ? 'Create' : 'Update'} </LoadingButton>
            </Box>
        </Box>
    </Box>
}