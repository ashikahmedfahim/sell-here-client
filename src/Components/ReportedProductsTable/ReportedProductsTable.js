import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import axios from '../../AxiosConfig';


export default function ReportedProductsTable() {
    const [reportedProducts, setReportedProducts] = React.useState([]);

    const getReportedProducts = async () => {
        try {
            const response = await axios.get('/reported-products');
            setReportedProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/products/${id}`);
            if (response.data.acknowledged) {
                getReportedProducts();
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getReportedProducts();
    }, []);

    function createData(_id, name) {
        return { _id, name };
    }

    const rows = reportedProducts.map(product => createData(product._id, product.name));



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell> 
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant='contained'
                                    color="error"
                                    onClick={() => handleDelete(row._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}