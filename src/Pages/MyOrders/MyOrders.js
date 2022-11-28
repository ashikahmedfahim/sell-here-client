import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from '../../AxiosConfig';
import Loading from '../../Components/Loading/Loading';

const MyOrders = () => {

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
        isLoading: myOrdersIsLoading
    } = useQuery({ queryKey: ['advertisement'], queryFn: getMyOrders });
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
                                                <Button variant="text">
                                                    Already Bought
                                                </Button>
                                                :
                                                <Button variant="contained">
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