import { Card } from '@material-tailwind/react';
import React from 'react';
import HomePageTaskCard from '../../Cards/HomePageTaskCard';


const Home = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
           <HomePageTaskCard/>
        </div>
    );
};

export default Home;