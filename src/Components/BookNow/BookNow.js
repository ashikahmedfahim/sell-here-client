import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from '../../Contexts/AuthPovider/AuthPovider';
import axios from '../../AxiosConfig';
import { UtilityContext } from '../../Contexts/UtilityPovider/UtilityPovider';

export default function BookNow({ open, setOpen, product }) {
    const { user } = React.useContext(AuthContext);
    const { setMessage, setMessageType } = React.useContext(UtilityContext);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [formValues, setFormValues] = React.useState({
        mobile: '',
        location: '',
        product: product._id,
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleBook = async () => {
        try {
            const response = await axios.post('/orders', formValues);
            if (response.status === 200) {
                setMessage('Product Booked Successfully');
                setMessageType('success');
            } else {
                setMessage('Something Went Wrong');
                setMessageType('error');
            }
        } catch (error) {
            console.log(error);
            setMessage('Something Went Wrong');
            setMessageType('error');
        } finally {
            setOpen(false);
        }
    }


    React.useEffect(() => {
        console.log(formValues);
        if (formValues.mobile.length && formValues.location.length) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [formValues]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Book Now</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="User Name"
                        type="text"
                        value={user?.displayName}
                        fullWidth
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="User Email"
                        type="text"
                        value={user?.email}
                        fullWidth
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Product Name"
                        type="text"
                        value={product?.name}
                        fullWidth
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Product Resale Price"
                        type="text"
                        value={product?.resalePrice}
                        fullWidth
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter Your Mobile Number"
                        type="text"
                        name='mobile'
                        value={formValues.mobile}
                        fullWidth
                        variant="standard"
                        onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter Meeting Location"
                        type="text"
                        name='location'
                        value={formValues.location}
                        fullWidth
                        variant="standard"
                        onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isDisabled}
                        onClick={handleBook}
                    >
                        Book
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}