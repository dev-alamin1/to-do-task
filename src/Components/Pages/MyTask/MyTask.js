import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import Loading from "../../Loading/Loading";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";



const MyTask = () => {

  const navigate = useNavigate();
  const {
    data: alltask,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["alltask"],
    queryFn: async () => {
      const res = await fetch(`https://todo-task-list-server.vercel.app/tasks`);
      const data = await res.json();
      return data;
    },
  });

  const completeHandler = (id) => {
    fetch(`https://todo-task-list-server.vercel.app/update-complete-status/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Task completed Successfully");
          // refetch();
          navigate('/complete-task')
          
        }
      });
  };

  const deleteHandler = (id) => {
    fetch(`https://todo-task-list-server.vercel.app/delete-task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Task Delete Successfully");
          refetch();
        }
      });
  };


  // data load for when click on edit button 
  const [editTask,setEditTask] = useState("");
  const editHandler = (id)=>{
      setOpen(!open);

      fetch(`https://todo-task-list-server.vercel.app/edit-task/${id}`)
        .then((res) => res.json())
        .then(data=>setEditTask(data))
       
  }

 

  // update task

  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState(""); //its use for taskname update

  const handleOpen = (id) => setOpen(!open);

  const onChangeHandler = (e)=>{

       const task_Name = e.target.value;
       setTaskName(task_Name);

  }

  console.log(taskName)

  const updateHandler = (id) => {
      setOpen(!open);

          const taskInfo ={
              taskName
           }

        fetch(`https://todo-task-list-server.vercel.app/update-task/${id}`,{
          method:'PUT',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(taskInfo)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.modifiedCount>0)
          {
              toast.success("Task update success");
              refetch();
          }
        })
          
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-5 md:px-20 w-screen md:w-11/12 mx-auto  pb-[400px]">
      <h2 className="text-center mt-10 text-white font-bold">
        My Task
      </h2>
      <div className="overflow-x-auto mt-10">
        <div className="grid grid-cols-1 justify-center md:grid-cols-3 gap-2">
          {alltask.map((task, index) => {
            return (
              <div
                key={index}
                className="card mx-auto w-80 md:w-96 bg-base-100 shadow-xl mb-4"
              >
                <div className="card-body">
                  <h2 className="card-title">{task.taskName}</h2>
                  {task?.comment ? <p>{task.comment}</p> : <p></p>}
                  <div className="card-actions">

                    <div className="flex  md:flex-row gap-1 w-full">
                      <button
                        onClick={() => deleteHandler(task._id)}
                        className="bg-primary w-full px-2 rounded-md text-white hover:bg-warning hover:shadow-md"
                        size="sm"
                      >
                        Delete
                      </button>

                      <button
                       onClick={()=>editHandler(task._id)}
                        className="bg-red-700 px-2 w-full  rounded-md text-white hover:bg-blue-900 hover:shadow-md"
                        size="sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => completeHandler(task._id)}
                        className="bg-amber-400 px-2 w-full  rounded-md text-white hover:bg-blue-900 hover:shadow-md"
                        size="sm"
                      >
                        Completed
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>


<Fragment>
  <Dialog open={open} handler={handleOpen}>
    <DialogHeader>Update Task</DialogHeader>
    <DialogBody divider>
      <Card className="w-full mt-5">
        <CardBody className="flex flex-col gap-4">
          <form >
            <Input
              type="text"
              label="Task name"
              name="taskname" defaultValue={editTask?.taskName}
              className="w-full" onBlur={onChangeHandler}
            />
            <div className="mt-5 flex justify-end">
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>

              <Button
                onClick={()=>updateHandler(editTask._id)}
                variant="gradient"
                color="green"
              >
                <span>Update</span>
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </DialogBody>
  </Dialog>
</Fragment>

    </div>
  );
};

export default MyTask;
