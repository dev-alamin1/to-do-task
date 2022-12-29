import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

const CompleteTask = () => {

  const navigate = useNavigate();

  const {data:alltask,isLoading,refetch} = useQuery({
    queryKey:['alltask'],
    queryFn: async()=>{
       const res = await fetch(`https://todo-task-list-server.vercel.app/complete-tasks`);
       const data = await res.json();
       return data;
    }
  });


  const deleteHandler = (id)=>{
    fetch(`https://todo-task-list-server.vercel.app/delete-task/${id}`,{
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

// taskNot complete handler 
  const notCompleteHandler = (id)=>{
    fetch(`https://todo-task-list-server.vercel.app/update-not-complete-status/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Task marks as not completed");
          navigate('/my-task')
        }
      });
  }


  // comment handler 

  const commentHandler = (e)=>{
       e.preventDefault();
        const form = e.target;
        const textComment = form.comment.value;
        const commentId = form.id.value;
        
        const commentInfo = {
          textComment,commentId
        }

        fetch(`https://todo-task-list-server.vercel.app/add-comment`,{
          method:'PUT',
          headers:{
            "content-type":'application/json'
          },
          body:JSON.stringify(commentInfo)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.acknowledged)
          {
            toast.success('comment added');
            refetch();
          }
        })
  }

  if(isLoading)
  {
    return <Loading/>
  }




  return (
    <div className="px-10 md:px-20 w-screen md:w-9/12 mx-auto">
      <h2 className="text-center mt-10">My Complete Task</h2>
      <div className="overflow-x-auto mt-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Task Name</th>
              <th>Action</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>

            {alltask.map((task,index)=>{
              return  <tr>
                        <th>{index+1}</th>
                        <td>{task.taskName}</td>
                        <td>
                        <div className="flex gap-2">
                              
                              <div className="flex items-center gap-2">
                                <button onClick={()=>deleteHandler(task._id)} className="bg-blue-700 px-2 rounded-sm text-white hover:bg-blue-900 hover:shadow-md"  size="sm">Delete</button>
                                <button onClick={()=>notCompleteHandler(task._id)} className="bg-blue-700 px-2  rounded-sm text-white hover:bg-blue-900 hover:shadow-md"  size="sm">Not completed</button>
                              </div>

                           </div>
                        </td>

                        <td>
                         <form onSubmit={commentHandler}>
                                 <div className="flex flex-col">
                                  <textarea defaultValue={task?.comment? task.comment:''} name="comment" className="border border-red-300" ></textarea>
                                  <input type="hidden" name="id" value={task._id} />
                                  <button type="submit" className="bg-blue-700 px-2 py-1 rounded-sm text-white hover:bg-blue-900 hover:shadow-md">Add comment</button>
                                 </div>
                             </form>
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