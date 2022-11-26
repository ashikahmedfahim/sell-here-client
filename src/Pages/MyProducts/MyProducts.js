import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../../AxiosConfig';
import MyProduct from '../../Components/MyProduct/MyProduct';

const MyProducts = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const response = await axios.get('/my-products');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Grid>
            <Box
                sx={{
                    margin: "50px 0",
                }}
            >
                <Typography
                    variant="h4"
                >
                    My Products
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {
                    products.map(product => (
                        <MyProduct key={product._id} product={product} />
                    ))
                }
            </Grid>
        </Grid>
    );
};

export default MyProducts;