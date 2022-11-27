import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DoneIcon from '@mui/icons-material/Done';

const ProductCard = ({ product }) => {
    return (
        <Grid item xs={12} md={4}>
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
                    >
                        Book Now
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductCard;