import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { BsListTask } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';

const Media = () => {


    // get all media task

    const {
        data: meadiTasks,
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["meadiTasks"],
        queryFn: async () => {
          const res = await fetch(`https://todo-task-list-server.vercel.app/media-task`);
          const data = await res.json();
          return data;
        },
      });


      const deleteHandler = (id) => {
        fetch(`https://todo-task-list-server.vercel.app/media-tast-delete/${id}`, {
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

      if(isLoading)
      {
        return <Loading/>
      }

    return (
        <div className="px-5 md:px-20 w-screen md:w-11/12 mx-auto  pb-[400px]">
          <h2 className="text-center mt-10 text-white font-bold">
            All Task With Media
          </h2>
          <div className="overflow-x-auto mt-10">
            <div className="grid grid-cols-1 justify-center md:grid-cols-3 gap-2">
              {meadiTasks.map((task, index) => {
                return (
                  <div
                    key={index}
                    className="card mx-auto w-80 md:w-96 bg-base-100 shadow-xl mb-4"
                  >
                    <div className="card-body">
                      <h2 className="card-title"><BsListTask/>{task.taskName}</h2>
                      {task?.comment ? <p>{task.comment}</p> : <p></p>}
                      <div className="card-actions">
    
                        <div className="grid grid-cols-2 gap-1 w-full">
                          <button
                            onClick={()=>deleteHandler(task._id)}
                            className="bg-primary w-full px-2 rounded-md text-white hover:bg-warning hover:shadow-md"
                            size="sm"
                          >
                            Delete
                          </button>
                         
    
                          <Link to={`/media-task-details/${task._id}`}>
                          <button
                            className="bg-amber-400 px-2 w-full  rounded-md text-white hover:bg-blue-900 hover:shadow-md"
                            size="sm"
                          >
                            Details
                          </button>
                          </Link>
    
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
    
          </div>

    
        </div>
      );
};

export default Media;