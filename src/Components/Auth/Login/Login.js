import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Login = () => {

    const submitHandler= (e)=>{
        e.preventDefault();

         const form = e.target;
         const email = form.email.value;
         const password = form.password.value;

    }

  return (
    <div className="flex justify-center items-center">
      <Card className="w-96 mt-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Log In
          </Typography>
        </CardHeader>
        <form onSubmit={submitHandler}>

      
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" name="email" size="lg" />
          <Input label="Password" name="password" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
            Log In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              <Link to="/register">Register </Link>
            </Typography>
          </Typography>
        </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
