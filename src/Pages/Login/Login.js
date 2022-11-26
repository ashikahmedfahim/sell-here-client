import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthPovider/AuthPovider';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from '../../AxiosConfig';
import { UtilityContext } from '../../Contexts/UtilityPovider/UtilityPovider';

const Login = () => {
    const { thirdPartyLogin, emailLogin, setUser, setIsLoading, isLoading } = useContext(AuthContext);
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const [apiError, setApiError] = useState('');
    const { setMessage, setMessageType } = useContext(UtilityContext);


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleLogin = () => {
        setIsLoading(true);
        thirdPartyLogin(googleProvider)
            .then(async (result) => {
                const response = await axios.post('/register', {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    accountType: 'buyer',
                    img: result?.user?.photoURL
                });
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    setUser(result?.user);
                    setMessage('Login Successful');
                    setMessageType('success');
                    navigate(from, { replace: true });
                } else {
                    setMessage('Login Failed');
                    setMessageType('error');
                }

            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleFormSubmit = () => {
        setIsLoading(true);
        setApiError("");
        emailLogin(formValues.email, formValues.password)
            .then(async (result) => {
                const response = await axios.post('/jwt', {
                    email: result?.user?.email
                });
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    setUser(result?.user);
                    setMessage('Login Successful');
                    setMessageType('success');
                    navigate(from, { replace: true });
                } else {
                    setMessage('Login Failed');
                    setMessageType('error');
                }
            })
            .catch((error) => {
                setApiError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (formValues.email && formValues.password) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [formValues.email, formValues.password]);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                margin: "50px 0"
            }}
        >
            <Grid item xs={12} md={6}>
                <Card
                    sx={{
                        padding: "50px 20px",
                    }}>
                    <Typography
                        variant='h4'
                        sx={{
                            marginBottom: "25px",
                            textAlign: "center"
                        }}
                    >
                        Login
                    </Typography>
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Email"
                        placeholder="Enter your email"
                        variant="outlined"
                        type='email'
                        name='email'
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Password"
                        placeholder="Enter your password"
                        type='password'
                        variant="outlined"
                        name='password'
                        value={formValues.password}
                        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                        fullWidth
                    />
                    <Typography
                        sx={{
                            margin: "10px 2px",
                        }}
                    >
                        Not a user? <Link to='/register'>Register here</Link>
                    </Typography>
                    <Button
                        variant='contained'
                        sx={{
                            margin: "10px 2px",
                            textAlign: 'left'
                        }}
                        disabled={isDisabled}
                        onClick={handleFormSubmit}
                    >
                        Login
                    </Button>
                    <br />
                    <Box
                        sx={{
                            width: '100%',
                            margin: "10px 0",
                            textAlign: 'center',
                        }}
                    >
                        <Button
                            variant='outlined'
                            sx={{
                                backgroundColor: "white",
                                color: "#E94647",
                                border: "1px solid #E94647",
                                '&:hover': {
                                    backgroundColor: "white",
                                    color: "#E94647",
                                    border: "1px solid #E94647",
                                }
                            }}
                            onClick={handleGoogleLogin}
                        >
                            Login with Google
                        </Button>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Login;