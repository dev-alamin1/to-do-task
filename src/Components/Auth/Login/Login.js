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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { toast } from "react-hot-toast";

const Login = () => {

    const {loginUserWithEmailPassword,loginWithGoogle} = useContext(AuthContext);
    const [loginError,setLoginError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const submitHandler= (e)=>{
        e.preventDefault();
        setLoginError("");

         const form = e.target;
         const email = form.email.value;
         const password = form.password.value;

         loginUserWithEmailPassword(email,password)
         .then(result=>{
            toast.success("Login Success");
            navigate(from,{replace:true})
         })
         .catch(error=>{
            setLoginError(error.message)
         });

    }

    const googleLoginHandler = ()=>{
         loginWithGoogle()
         .then(result=>{
          toast.success("Login Success");
          navigate(from,{replace:true})
       })
       .catch(error=>{
          setLoginError(error.message)
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
            Log In
          </Typography>
        </CardHeader>

        <form onSubmit={submitHandler}>

      
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" type="email" name="email" size="lg" />
          <Input label="Password" type="password" name="password" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
            Log In
          </Button>

          <Button onClick={googleLoginHandler} variant="gradient" fullWidth className="mt-2">
            Login with Google
          </Button>


          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            
              <Link className="text-blue-500 font-semibold" to="/register"> Register </Link>
            
          </Typography>

          {
            loginError && 
            <Typography variant="small" className="mt-6 flex justify-center text-red-500">
            {loginError}
           
          </Typography>
          }
        </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
