import { Box, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../AxiosConfig';
import MyProduct from '../../Components/MyProduct/MyProduct';
import SellerProductCard from '../../Components/SellerProductCard/SellerProductCard';
import { UtilityContext } from '../../Contexts/UtilityPovider/UtilityPovider';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const { setMessage, setMessageType } = useContext(UtilityContext);

    const getAllProducts = async () => {
        try {
            const response = await axios.get('/my-products');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAdvertise = async (id) => {
        try {
            const response = await axios.patch(`/advertised-products/${id}`);
            if (response.status === 200) {
                setMessage('Product Advertised Successfully');
                setMessageType('success');
                getAllProducts();
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

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/products/${id}`);
            if (response.data.acknowledged) {
                setMessage('Product Deleted Successfully');
                setMessageType('success');
                getAllProducts();
            }
        } catch (error) {
            console.log(error);
            setMessage('Something Went Wrong');
            setMessageType('error');
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Grid
            container
            sx={{
                paddingBottom: "100px",
            }}
        >
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
                        <SellerProductCard
                            key={product._id}
                            product={product}
                            handleAdvertise={handleAdvertise}
                            handleDelete={handleDelete}
                        />
                    ))
                }
            </Grid>
        </Grid>
    );
};

export default MyProducts;