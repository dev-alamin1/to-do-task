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
      const res = await fetch(`http://localhost:5000/tasks`);
      const data = await res.json();
      return data;
    },
  });

  const completeHandler = (id) => {
    fetch(`http://localhost:5000/update-complete-status/${id}`, {
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
    fetch(`http://localhost:5000/delete-task/${id}`, {
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

      fetch(`http://localhost:5000/edit-task/${id}`)
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

        fetch(`http://localhost:5000/update-task/${id}`,{
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
    <div className="px-10 md:px-20 w-screen md:w-2/4 mx-auto">
      <h2 className="text-center mt-10">My Task</h2>
      <div className="overflow-x-auto mt-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {alltask?.map((task, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <td>{task.taskName}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={()=>editHandler(task._id)}
                        className="bg-blue-700 px-2 py-1 rounded-sm text-white hover:bg-blue-900 hover:shadow-md"
                        size="sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHandler(task._id)}
                        className="bg-blue-700 px-2 py-1 rounded-sm text-white hover:bg-blue-900 hover:shadow-md"
                        size="sm"
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-700 px-2 py-1 rounded-sm text-white hover:bg-blue-900 hover:shadow-md"
                        onClick={() => completeHandler(task._id)}
                      >
                        Completed
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


          {/* task update  */}

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
