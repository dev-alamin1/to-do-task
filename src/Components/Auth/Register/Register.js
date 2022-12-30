import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { AuthContext } from "../../../Context/AuthProvider";
import { Link } from "react-router-dom";

const Register = () => {

    const {registerWithEmailPassword} = useContext(AuthContext);
    const [registerError,setRegisterError]= useState("");

    const submitHandler= (e)=>{
        e.preventDefault();
         setRegisterError("");
         const form = e.target;
         const email = form.email.value;
         const password = form.password.value;
         
         registerWithEmailPassword(email,password)
         .then(result=>{
             const user = result.user;
             console.log(user);
         })
         .catch(error=>{
            console.log(error.message);
            setRegisterError(error.message)
         });


    }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 mt-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Register
          </Typography>
        </CardHeader>

        <form onSubmit={submitHandler}>

        <CardBody className="flex flex-col gap-4">
          <Input label="Email" name="email" size="lg" />
          <Input label="Password" type="password" name="password" size="lg" />
        </CardBody>

        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Register
          </Button>

          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            
              <Link className="text-blue-500 font-semibold" to="/login">Login</Link>
           
          </Typography>

          {
            registerError && 
            <Typography variant="small" className="mt-6 flex justify-center text-red-500">
            {registerError}
           
          </Typography>
          }

        </CardFooter>

        </form>
      </Card>
    </div>
  );
};

export default Register;
