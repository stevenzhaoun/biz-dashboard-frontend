import { useEffect, useState } from "react"
import { getUsers } from "../../api/user.api"
import { User } from "../../types"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

export default function ListUsers() {
    const [data, setData] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchData = async () => {
        setLoading(true)
        const users = await getUsers()
        setData(users)
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'string',
            minWidth: 150,
            flex: 1
        },
        {
            field: 'roleId',
            headerName: "Role",
            valueGetter: (params: GridValueGetterParams<User>) => {
                return params.row.roleId
            },
            flex: 1
        }
    ];

    if (loading) {
        return <CircularProgress />
    }
    return <Box>
        <Box display="flex" justifyContent={"space-between"} mb={3}>
            <Typography variant="h4">Users</Typography>
            <Button variant="outlined" size='small' onClick={() => navigate('/users/add')}>Create New User</Button>
        </Box>
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={data}
                onRowClick={(e) => navigate(`/users/${e.id}`)}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    </Box>
}