import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';

const Main = () => {
    return (
        <div className='border  bg-blue-gray-200'>
            <Header/>
            <Outlet/>

        </div>
    );
};

export default Main;