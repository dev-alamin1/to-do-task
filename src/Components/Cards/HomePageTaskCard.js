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
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HomePageTaskCard = () => {

  const navigate = useNavigate();

    const submitHanlder = (e)=>{
            e.preventDefault();
            console.log(e.target.taskname.value)
            const form = e.target;
            const taskName = form.taskname.value;

            const taskInfo ={
              taskName,
              isComplete:false
            }

            fetch('https://todo-task-list-server.vercel.app/tasks',{
              method:'POST',
              headers:{
                'content-type':'application/json'
              },
              body: JSON.stringify(taskInfo)
            })
            .then(res=>res.json())
            .then(data=>{
              if(data.acknowledged)
              {
                toast.success('task added successfully')
                form.reset();
                navigate('/my-task')
              }
            })
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
