import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Box, handleBreakpoints } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import axios from '../../AxiosConfig';
import Loading from '../../Components/Loading/Loading';
import { UtilityContext } from '../../Contexts/UtilityPovider/UtilityPovider';

const MyOrders = () => {
    const { setMessage, setMessageType } = useContext(UtilityContext);

    const getMyOrders = async () => {
        try {
            const response = await axios.get('/my-orders');
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const {
        data: myOrders,
        isLoading: myOrdersIsLoading,
        refetch
    } = useQuery({ queryKey: ['advertisement'], queryFn: getMyOrders });

    const handleBuyNow = async (id) => {
        try {
            const response = await axios.patch(`/buy-now/${id}`);
            if (response.status === 200) {
                setMessage('Product Bought Successfully');
                setMessageType('success');
                refetch();
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
    return (
        <Grid
            container
            sx={{
                padding: "50px 0",
            }}
        >
            {
                myOrdersIsLoading ?
                    <Loading />
                    :
                    myOrders && myOrders.length > 0 ?
                        myOrders.map(order => (
                            <Grid key={order._id} item xs={12} sm={6} md={4} lg={3}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <img src={order.imageUrl} alt='' width='100%' />
                                        <Typography variant="h5" component="div">
                                            {order.name}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Resale Price: {order.resalePrice}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Mobile Number:
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {
                                            order.isSold ?
                                                order.isOwner ?
                                                    <Button variant="text">
                                                        Already Paid
                                                    </Button>
                                                    :
                                                    <Button
                                                        variant="text"
                                                        color='error'
                                                    >
                                                        Already Sold
                                                    </Button>
                                                :
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleBuyNow(order._id)}
                                                >
                                                    Pay
                                                </Button>
                                        }
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                        :
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <h1>No Orders Found</h1>
                        </Box>
            }
        </Grid>
    );
};

export default MyOrders;