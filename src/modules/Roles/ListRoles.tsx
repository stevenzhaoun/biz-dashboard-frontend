import { useEffect, useState } from "react"
import { getRoles } from "../../api/roles.api"
import { Role } from "../../types"
import { Box, CircularProgress, Typography, Button } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link, useNavigate } from "react-router-dom";


export default function ListRoles(){
    const [data, setData] = useState<Role[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchData = async () => {
        setLoading(true)
        const roles = await getRoles()
        setData(roles)
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
    ];

    if (loading) {
        return <CircularProgress />
    }
    return <Box>

        <Box mb={3} display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4">Roles</Typography>
            <Link to="/roles/add"><Button variant="outlined"  size="small">Add Role</Button></Link>
        </Box>
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
                onRowClick={(e) => {return navigate(`/roles/${e.id}`)}}
            />
        </Box>
    </Box>
}