import React, { useContext } from 'react';
import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { toast } from 'react-hot-toast';

const Header = () => {
    const [openNav, setOpenNav] = useState(false);
    const {logOutUser,user} = useContext(AuthContext);

    const logOutHandler = ()=>{
         logOutUser()
         .then(()=>{
            toast.success("Logout success");
         })
         .catch((error)=>{
            console.log(error.message)
         })
    }
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={'/'} className="flex items-center">
         Home
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={'/add-task'} className="flex items-center">
          Add Task
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={'/my-task'} className="flex items-center">
          My Task
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={"/complete-task"} className="flex items-center">
           Complete Task
        </Link>
      </Typography>


      {
        user?.email ? 

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Button onClick={logOutHandler} variant="gradient" size='sm'  className="">
           Log out
        </Button>

        
      </Typography>
        
        : 

        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={'/login'}><Button variant="gradient" size='sm'  className="">
           Login
        </Button></Link>

        
      </Typography>

      }

      
     
    </ul>
  );
 
  return (
    <Navbar className="mx-auto  py-2  lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
         <Link to={"/"}>To-do Task</Link>
        <div className="hidden lg:block">{navList}</div>

        



        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
      </MobileNav>
    </Navbar>
  );
};

export default Header;