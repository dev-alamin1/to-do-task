import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const MedaiUpdate = () => {

    const taskInfo = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm();

  const navigate = useNavigate();

  const updateTask = (data) => {
    // const image = data.taskImg[0];
    // const formData = new FormData();
    // formData.append("image", image);

    // const imageHostKey = "bb4f8d986dbbcfa994988ac7af57b12b";
    // const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    // fetch(url, {
    //   method: "PUT",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((img) => {
    //     if (img.success) {
    //        const taskName = data.taskName;
    //        const taskDetails = data.details;

    //        const taskInfo = {
    //         taskName,taskDetails, taskImg: img.data.url,
    //        }

    //        // store to database 

          
    //     }
    //   });

        const taskName = data.taskName;
        const taskDetails = data.details;

    const newTaskInfo ={
        taskName,taskDetails
    }

    fetch(`https://todo-task-list-server.vercel.app/update-media-task/${taskInfo._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json', 
        },
        body: JSON.stringify(newTaskInfo)
       })
     .then(res => res.json())
       .then(data=>{
         if(data.acknowledged)
         {
           toast.success("Task Update success ");
           reset();
           navigate('/media-task');

         }
        console.log(data)
       })
  };

  return (
    <div className="flex justify-center items-center pb-40">
      <div className="flex flex-col w-96 p-6 mt-5 rounded-md sm:p-10 bg-black text-white">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Update Task</h1>
        </div>

        <form  onSubmit={handleSubmit(updateTask)}>
          <div className="mt-4  gap-4">
            <div>
              <label
                htmlFor="productName"
                className="text-sm text-white block mb-1 font-medium"
              >
                Task Name
              </label>
              <input
                {...register("taskName", { required: "Provide task name" })}
                type="text"
                name="taskName" defaultValue={taskInfo.taskName}
                className="bg-gray-100 border border-gray-200  placeholder-red-500 text-black rounded py-1 px-3 block text-white w-full"
                placeholder="Task name"
              />
              {errors.taskName && (
                <label className="text-red-600 text-left">
                  {errors.taskName?.message}
                </label>
              )}
            </div>

            {/* <div className="mt-4">
              <label
                htmlFor="taskImg"
                className="text-sm text-white block mb-1 font-medium"
              >
                {" "}
                Choose Task Photos
              </label>
              <input
                {...register("taskImg", {
                  required: "Please Choose task image",
                })}
                type="file"
                className="file-input file-input-bordered file-input-warning  placeholder-red-500 text-black w-full max-w-xs"
              />
              {errors.taskImg && (
                <label className="text-red-600 text-left">
                  {errors.taskImg?.message}
                </label>
              )}
            </div> */}
          </div>

          <div className="w-full mt-4">
            <label
              htmlFor="description"
              className="text-sm text-white block mb-1 font-medium"
            >
              Description
            </label>
            <textarea defaultValue={taskInfo.taskDetails}
              {...register("details", { required: "Please add  description" })}
              className="textarea textarea-accent placeholder-red-500 text-black w-full"
              placeholder="description"
            ></textarea>
            {errors.details && (
              <label className="text-red-600 text-left">
                {errors.details?.message}
              </label>
            )}
          </div>

          <div className="space-x-4 mt-8">
            <button
              type="submit"
              className="py-2 px-4 btn-primary y text-white rounded  disabled:opacity-50"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedaiUpdate;
