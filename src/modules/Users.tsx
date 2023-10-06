import { useEffect, useState } from "react"
import { getUsers } from "../api/user.api"
import { User } from "../types"
import { Box, CircularProgress, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';



export default function Users() {
    const [data, setData] = useState<User[]>([])
    const [loading, setLoading] = useState(false)

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
        <Typography variant="h4">Users</Typography>
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={data}
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