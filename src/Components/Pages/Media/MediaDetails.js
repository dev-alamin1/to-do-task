import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import { Link, useLoaderData } from "react-router-dom";

const MediaDetails = () => {

    const taskInfo = useLoaderData();
    console.log(taskInfo)

  return (
    <div className="px-5 md:px-20 w-screen md:w-11/12 mx-auto  pb-[400px]">
      <h2 className="text-center mt-10 text-white font-bold text-3xl">Task Details</h2>
      <div className="overflow-x-auto mt-10">
        <div className="flex  justify-center">
        <Card className="w-96">
      <CardHeader floated={false} className="h-60">
        <img
          src={taskInfo.taskImg}
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
            {taskInfo.taskName}
        </Typography>
        <Typography>
          {taskInfo.taskDetails}
        </Typography>
      </CardBody>
      <CardFooter divider className="grid grid-cols-2 items-center justify-between gap-2 py-3">
               
                 <Link to={`/media-update/${taskInfo._id}`}>
                 <button className="bg-primary w-full px-2 rounded-md text-white hover:bg-blue-700 hover:shadow-md"
                            size="sm"
                          >
                            Update
                 </button>
                 </Link>

                 

                 <Link to={'/media-task'}>
                 <button className="bg-secondary w-full px-2 rounded-md text-white hover:bg-warning hover:shadow-md"
                            size="sm"
                          >
                            Back
                 </button>
                 </Link>
        
      </CardFooter>
    </Card>
        </div>
       </div>
    </div>
  );
};

export default MediaDetails;
