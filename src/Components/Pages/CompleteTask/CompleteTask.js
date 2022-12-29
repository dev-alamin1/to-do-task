import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import Loading from "../../Loading/Loading";

const CompleteTask = () => {

  const {data:alltask,isLoading,refetch} = useQuery({
    queryKey:['alltask'],
    queryFn: async()=>{
       const res = await fetch(`http://localhost:5000/complete-tasks`);
       const data = await res.json();
       return data;
    }
  });


  const deleteHandler = (id)=>{
    fetch(`http://localhost:5000/delete-task/${id}`,{
      method:'DELETE'
     })
     .then(res=>res.json())
     .then(data=>{
      if(data.deletedCount>0)
      {
        toast.success("Task Delete Successfully")
        refetch();

      }
     })
    
}

  if(isLoading)
  {
    return <Loading/>
  }




  return (
    <div className="px-10 md:px-20 w-screen md:w-3/5 mx-auto">
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

            {alltask.map((task,index)=>{
              return  <tr>
                        <th>{index+1}</th>
                        <td><del>{task.taskName}</del></td>
                        <td>
                        <div className="flex gap-2">
                              
                              <button onClick={()=>deleteHandler(task._id)} className="bg-blue-700 px-2 py-1 rounded-sm text-white hover:bg-blue-900 hover:shadow-md"  size="sm">Delete</button>
                              <button className="bg-blue-700 px-2 py-1 rounded-sm text-white hover:bg-blue-900 hover:shadow-md"  size="sm">Not completed</button>

                           </div>
                        </td>
                    </tr>
            })}
            

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompleteTask;