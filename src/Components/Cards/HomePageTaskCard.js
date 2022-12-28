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
       
       <form>
           <Input label="type task name" name="taskName" size="lg" />
       </form>
    
      </CardBody>
     
    </Card>
  );
};

export default HomePageTaskCard;
