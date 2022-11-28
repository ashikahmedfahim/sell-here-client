import { Container } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Blogs from './Pages/Blogs/Blogs';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Register/Register';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UtilityContext } from './Contexts/UtilityPovider/UtilityPovider';
import AddProduct from './Pages/AddProduct/AddProduct';
import MyProducts from './Pages/MyProducts/MyProducts';
import MyOrders from './Pages/MyOrders/MyOrders';
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts';

const App = () => {
  const { message, messageType } = useContext(UtilityContext);

  useEffect(() => {
    if (message) {
      if (messageType === 'success') {
        toast.success(message)
      } else {
        toast.error(message)
      }
    }
  }, [message, messageType]);

  return (
    <>
      <Navbar />
      <ToastContainer theme="colored" />
      <Container maxWidth="lg" className='min-height-80'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* private routes  */}
          <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="buyers" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="sellers" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="reported-products" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="my-products" element={<PrivateRoute><MyProducts /></PrivateRoute>} />
          <Route path="my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
          <Route path="category/:id" element={<PrivateRoute><CategoryProducts /></PrivateRoute>} />
          {/* Not found route  */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default App;