import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Checkbox,
} from "@material-tailwind/react";

const HomePageTaskCard = () => {

    const submitHanlder = (e)=>{
            e.preventDefault();
            console.log(e.target.taskname.value)
    }
  return (
    <Card className="w-96 mt-10">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-10 place-items-center"
      >
        <Typography variant="h3" color="white">
          Add task
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
       
       <form onSubmit={submitHanlder}>
            <Input type="text" label="Task name" name="taskname"  className="w-full" />
       </form>
    
      </CardBody>
     
    </Card>
  );
};

export default HomePageTaskCard;
