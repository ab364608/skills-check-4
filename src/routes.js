import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
// import Navbar from './components/Navbar/Navbar';

export default (
    <>
    <Switch>
        <Route component={Home} exact path='/' />
        <Route component={Posts} path='/posts' />
    </Switch>
    </>
)