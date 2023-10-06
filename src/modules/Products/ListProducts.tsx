import { useEffect, useState } from "react"
import { Product } from "../../types"
import { Box, CircularProgress, Typography, Button } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/product.api";


export default function ListProducts(){
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchData = async () => {
        setLoading(true)
        const products = await getProducts()
        setData(products)
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'title',
            headerName: 'title',
            flex: 1
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 1
        },
    ];

    if (loading) {
        return <CircularProgress />
    }
    return <Box>

        <Box mb={3} display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4">Products</Typography>
            <Button variant="outlined" href="/roles/add" size="small">Add Product</Button>
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
                onRowClick={(e) => {return navigate(`/products/${e.id}`)}}
            />
        </Box>
    </Box>
}