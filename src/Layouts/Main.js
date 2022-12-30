import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';

const Main = () => {
    return (
        <div className='bg-deep-purple-400'>
            <Header/>
            <Outlet/>

        </div>
    );
};

export default Main;