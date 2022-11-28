import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import UserTable from '../../Components/UserTable/UserTable';
import axios from '../../AxiosConfig';
import ReportedProductsTable from '../../Components/ReportedProductsTable/ReportedProductsTable';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { UtilityContext } from '../../Contexts/UtilityPovider/UtilityPovider';

const Dashboard = () => {
    const [selected, setSelected] = useState(1);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setMessage, setMessageType } = useContext(UtilityContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleButtonClick = (id) => {
        setSelected(id);
        if (id !== 3) {
            getUserData(id);
        }
    }

    const handleVerify = async (id) => {
        try {
            const response = await axios.patch(`/verify-user/${id}`);
            if (response.data.acknowledged) {
                getUserData(selected);
                setMessage('User Verified Successfully');
                setMessageType('success');
            }else{
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
            const response = await axios.delete(`/users/${id}`);
            if (response.data.acknowledged) {
                getUserData(selected);
                setMessage('User Deleted Successfully');
                setMessageType('success');
            }else{
                setMessage('Something Went Wrong');
                setMessageType('error');
            }
        } catch (error) {
            console.log(error);
            setMessage('Something Went Wrong');
            setMessageType('error');
        }
    }

    const getUserData = async (id) => {
        try {
            setIsLoading(true);
            let accountType;
            if (id === 1) {
                accountType = 'buyer';
            } else {
                accountType = 'seller';
            }
            setUsers([]);
            const response = await axios.get(`/users?accountType=${accountType}`);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (location.pathname === '/dashboard' || location.pathname === '/buyers') {
            handleButtonClick(1);
        } else if (location.pathname === '/sellers') {
            handleButtonClick(2);
        } else if (location.pathname === '/reported-products') {
            handleButtonClick(3);
        }
    }, [location.pathname]);

    return (
        <div >
            <Box sx={{ margin: "50px 0" }}>
                <Box sx={{ margin: "20px 0" }}  >
                    <Button
                        variant={selected === 1 ? 'contained' : 'outlined'}
                        sx={{ margin: "10px 10px 0 0" }}
                        onClick={() => navigate('/buyers')}
                    >
                        Buyer
                    </Button>
                    <Button
                        variant={selected === 2 ? 'contained' : 'outlined'}
                        sx={{ margin: "10px 10px 0 0" }}
                        onClick={() => navigate('/sellers')}
                    >
                        Seller
                    </Button>
                    <Button
                        variant={selected === 3 ? 'contained' : 'outlined'}
                        sx={{ margin: "10px 10px 0 0" }}
                        onClick={() => navigate('/reported-products')}
                    >
                        Reported Items
                    </Button>
                </Box>
                {
                    selected === 3 ?
                        <ReportedProductsTable />
                        :
                        isLoading ?
                            <Loading />
                            :
                            <UserTable
                                users={users}
                                handleVerify={handleVerify}
                                handleDelete={handleDelete}
                                accountType={selected === 1 ? 'buyer' : 'seller'}
                            />
                }
            </Box>
        </div>
    );
};

export default Dashboard;