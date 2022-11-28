import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
import BannerOne from '../../Images/banner.jpg';
import axios from '../../AxiosConfig';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [advertisedProducts, setAdvertisedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const getAdvertisedProducts = async () => {
        try {
            const response = await axios.get('/advertised-products');
            setAdvertisedProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAdvertisedProducts();
        getCategories();
    }, []);

    return (
        <>
            <img className='home-banner' src={BannerOne} alt='' />
            {
                advertisedProducts && advertisedProducts.length > 0 &&
                <Box
                    sx={{
                        padding: "50px 0",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            marginBottom: "50px"
                        }}
                    >
                        Advertised Items
                    </Typography>
                    <Grid container spacing={2}>
                        {
                            advertisedProducts.map(product => (
                                <Grid key={product._id} item xs={12} md={4}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <img src={product.imageUrl} alt='' height='330px' width='100%' />
                                            <Typography variant="h5" component="div">
                                                {product.name}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Original Price: {product.originalPrice}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            }
            {
                categories && categories.length > 0 &&
                <Box
                    sx={{
                        padding: "50px 0",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            marginBottom: "50px"
                        }}
                    >
                        Categories
                    </Typography>
                    <Grid container spacing={2}>
                        {
                            categories.map(category => (
                                <Grid key={category.title} item xs={12} md={4}>
                                    <Box
                                        sx={{
                                            height: "200px",
                                            width: "100%",
                                            backgroundColor: "grey",
                                            borderRadius: "10px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => navigate(`/category/${category._id}`)}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: "white",
                                            }}
                                        >
                                            {category.title}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            }
            <Box
                sx={{
                    padding: "50px 0",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        marginBottom: "50px"
                    }}
                >
                    About Us
                </Typography>
                <Typography
                    sx={{
                        textAlign: "justify"
                    }}
                >
                    Sell-here.com is a WebSite to Sell used cars of different types.
                    <br />
                    People all over the Bangladesh can sell their used cars here.
                    Cars can be sold by the owner or by the car dealer. You can find the best used cars here.
                    Cars of different brands and different types are available here.
                    Sedan, Hatchback, SUV, Pickup, Van, Minivan, Coupe, Convertible, Wagon, Hybrid, Electric, Crossover, Luxury, Performance, and many more.
                    Choose your car and buy it.
                </Typography>
            </Box>
        </>
    );
};

export default Home;