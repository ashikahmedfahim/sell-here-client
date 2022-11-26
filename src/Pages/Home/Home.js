import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
import BannerOne from '../../Images/banner.jpg';

const Home = () => {
    return (
        <>
            <img className='home-banner' src={BannerOne} alt='' />
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
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </Grid>
            </Box>
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
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </Grid>
            </Box>
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