import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../AxiosConfig';
import Loading from '../../Components/Loading/Loading';
import ProductCard from '../../Components/ProductCard/ProductCard';

const CategoryProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const getProductsByCategory = async (id) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/categories/${id}/products`);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProductsByCategory(id);
    }, [id]);

    return (
        <Grid
            container
            sx={{
                padding: "50px 0",
            }}
        >
            {
                isLoading ?
                    <Loading />
                    :
                    products && products.length > 0 ?
                        products.map(product => (
                            <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))
                        :
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <h1>No Products Found</h1>
                        </Box>
            }


        </Grid>
    );
};

export default CategoryProducts;