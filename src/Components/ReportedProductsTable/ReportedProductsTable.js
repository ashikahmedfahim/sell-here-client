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
import Loading from '../Loading/Loading';
import { UtilityContext } from '../../Contexts/UtilityPovider/UtilityPovider';


export default function ReportedProductsTable() {
    const [reportedProducts, setReportedProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const { setMessage, setMessageType } = React.useContext(UtilityContext);

    const getReportedProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/reported-products');
            setReportedProducts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/products/${id}`);
            if (response.data.acknowledged) {
                getReportedProducts();
                setMessage('Product Deleted Successfully');
                setMessageType('success');
            } else {
                setMessage('Something Went Wrong');
                setMessageType('error');
            }
        } catch (error) {
            console.log(error);
            setMessage('Something Went Wrong');
            setMessageType('error');
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
        <>
            {
                isLoading ?
                    <Loading />
                    :
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
            }
        </>
    );
}