import React from 'react'; 
import { Switch } from 'react-router-dom';

import Route from './Route'; 

import SignIn from '../pages/SignIn'; 
import ForgotPassword from '../pages/ForgotPassword'; 
import ResetPassword from '../pages/ResetPassword'; 
import SignUp from '../pages/SignUp'; 
import Dashboard from '../pages/Dashboard'; 
import Profile from '../pages/Profile'; 
import ProductList from '../pages/ProductList'; 
import Product from '../pages/Product'; 
import ProductDetail from '../pages/ProductDetail'; 


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/product-list" component={ProductList} isPrivate />
        <Route path="/product" component={Product} isPrivate />
        <Route path="/product-detail" component={ProductDetail} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />
    </Switch>

);

export default Routes; 