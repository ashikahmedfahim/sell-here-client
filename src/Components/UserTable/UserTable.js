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


export default function UserTable({ users, handleVerify, handleDelete, accountType }) {
    function createData(_id, name, email, isVerified) {
        return { _id, name, email, isVerified };
    }

    const rows = users.map(user => createData(user._id, user.name, user.email, user.isVerified));

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        {
                            accountType === 'seller' &&
                            <TableCell>Is Verified</TableCell>
                        }
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
                            <TableCell>{row.email}</TableCell>
                            {
                                accountType === 'seller' &&
                                <TableCell>
                                    {
                                        row.isVerified ?
                                            <DoneIcon
                                                sx={{ color: "blue" }}
                                            /> :
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleVerify(row._id)}
                                            >
                                                Verify
                                            </Button>
                                    }

                                </TableCell>
                            }
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