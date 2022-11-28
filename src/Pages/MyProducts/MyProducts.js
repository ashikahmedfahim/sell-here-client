import { Box, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../AxiosConfig';
import Loading from '../../Components/Loading/Loading';
import MyProduct from '../../Components/MyProduct/MyProduct';
import SellerProductCard from '../../Components/SellerProductCard/SellerProductCard';
import { UtilityContext } from '../../Contexts/UtilityPovider/UtilityPovider';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const { setMessage, setMessageType } = useContext(UtilityContext);
    const [isLoading, setIsLoading] = useState(false);

    const getAllProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/my-products');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
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
            {
                isLoading ?
                    <Loading />
                    :
                    products && products.length > 0 ?
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
                        :
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            No Products Found
                        </Typography>
            }
        </Grid>
    );
};

export default MyProducts;