import { Card } from '@material-tailwind/react';
import React from 'react';
import HomePageTaskCard from '../../Cards/HomePageTaskCard';


const Home = () => {
    return (
        <div className='flex justify-center items-center'>
           <HomePageTaskCard/>
        </div>
    );
};

export default Home;