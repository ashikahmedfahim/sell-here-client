import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import BookNow from '../BookNow/BookNow';
import { UtilityContext } from '../../Contexts/UtilityPovider/UtilityPovider';
import axios from '../../AxiosConfig';

const ProductCard = ({ product }) => {
    const [open, setOpen] = React.useState(false);
    const { setMessage, setMessageType } = React.useContext(UtilityContext);

    const handleReport = async (id) => {
        try {
            const response = await axios.patch(`/reported-products/${id}`);
            if (response.status === 200) {
                setMessage('Product Reported Successfully');
                setMessageType('success');
            }else{
                setMessage('Something Went Wrong');
                setMessageType('error');
            }
        } catch (error) {
            console.log(error);
            setMessage('Something Went Wrong');
            setMessageType('error');
        }
    }

    return (
        <Grid item xs={12} md={4}>
            {
                open &&
                <BookNow open={open} setOpen={setOpen} product={product} />
            }
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <img src={product.imageUrl} alt='' width='100%' />
                    <Typography variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant="body2">
                        {product.description}
                    </Typography>
                    <Typography color="text.secondary">
                        Location: {product.location}
                    </Typography >
                    <Typography color="text.secondary">
                        Condition: {product.condition}
                    </Typography >
                    <Typography color="text.secondary">
                        Resale Price: {product.resalePrice}
                    </Typography>
                    <Typography color="text.secondary">
                        Original Price: {product.originalPrice}
                    </Typography>
                    <Typography color="text.secondary">
                        Years of use: {product.yearsOfUse}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Year of purchase: {product.yearOfPurchase}
                    </Typography>
                    <Typography color="text.secondary">
                        Posted By:
                    </Typography>
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {product.seller.name}
                        {product.seller.isVerified &&
                            <DoneIcon
                                sx={{ color: "blue" }}
                            />}
                    </Typography>
                    <Typography color="text.secondary">
                        Mobile Number:
                    </Typography>
                    <Typography>
                        {product.mobile}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{
                            fontSize: 14,
                        }}
                    >
                        Posted on
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                        }}
                    >
                        {new Date(product.createdAt).toLocaleTimeString()}.
                        {new Date(product.createdAt).toLocaleDateString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => setOpen(true)}
                    >
                        Book Now
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color='error'
                        onClick={() => handleReport(product._id)}
                    >
                        Report to Admin
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductCard;