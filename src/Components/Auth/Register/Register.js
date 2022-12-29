import React, { useContext } from "react";
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

const Register = () => {

    const {registerWithEmailPassword} = useContext(AuthContext);

    const submitHandler= (e)=>{
        e.preventDefault();

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
         });


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
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              Login
            </Typography>
          </Typography>
        </CardFooter>

        </form>
      </Card>
    </div>
  );
};

export default Register;
