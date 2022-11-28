import React from 'react';
import axios from '../../AxiosConfig';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Blogs = () => {

    const getBlogs = async () => {
        try {
            const response = await axios.get('/blogs');
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const {
        data: blogs,
        isLoading: blogsIsLoading
    } = useQuery({ queryKey: ['blogs'], queryFn: getBlogs });

    return (
        <Box
            sx={{
                padding: "50px 0",
            }}
        >
            <Typography
                variant='h2'
                sx={{
                    marginBottom: '50px'
                }}
            >
                Read Our Latest Blogs Here
            </Typography>
            <Grid
                container
            >
                {
                    blogsIsLoading ?
                        <Loading />
                        :
                        <>
                            {
                                blogs && blogs.length > 0 &&
                                blogs.map(blog => (
                                    <Grid
                                        item xs={12} md={6}
                                    >
                                        <Box
                                            key={blog._id}
                                            sx={{
                                                padding: "15px",
                                                margin: "20px",
                                                border: "1px solid #ccc",
                                                minHeight: "300px",
                                                boxShadow: "10px 10px 15px #ccc",
                                            }}
                                        >
                                            <h2>{blog.title}</h2>
                                            <ul>
                                                {
                                                    blog.data.map(dt => (
                                                        <li>{dt}</li>
                                                    ))
                                                }
                                            </ul>
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </>
                }
            </Grid>
        </Box>
    );
};

export default Blogs;