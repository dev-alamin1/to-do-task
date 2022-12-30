import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { FaTasks ,FaCommentAlt} from 'react-icons/fa';

const CompleteTask = () => {
  const navigate = useNavigate();

  const {
    data: completeTasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["completeTasks"],
    queryFn: async () => {
      const res = await fetch(
        `https://todo-task-list-server.vercel.app/complete-tasks`
      );
      const data = await res.json();
      return data;
    },
  });

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

  // taskNot complete handler
  const notCompleteHandler = (id) => {
    fetch(
      `https://todo-task-list-server.vercel.app/update-not-complete-status/${id}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Task marks as not completed");
          navigate("/my-task");
        }
      });
  };

  // comment handler

  const commentHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const textComment = form.comment.value;
    const commentId = form.id.value;

    const commentInfo = {
      textComment,
      commentId,
    };

    fetch(`https://todo-task-list-server.vercel.app/add-comment`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("comment added");
          refetch();
          form.reset();
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-5 md:px-20 w-screen md:w-11/12 mx-auto  pb-80">
      <h2 className="text-center mt-10 text-white font-bold">
        My Complete Task
      </h2>
      <div className="overflow-x-auto mt-10">
        <div className="grid grid-cols-1 justify-center md:grid-cols-3 gap-2">
          {completeTasks.map((task, index) => {
            return (
              <div
                key={index}
                className="card mx-auto w-80 md:w-96 bg-base-100 shadow-xl mb-4"
              >
                <div className="card-body">
                  <h2 className="card-title"><FaTasks/>{task.taskName}</h2>
                  {task?.comment ? <div className="flex gap-2 items-center"><FaCommentAlt/> {task.comment}</div> : <p></p>}
                  <div className="card-actions">
                    <div className="w-full">
                      <form onSubmit={commentHandler}>
                        <div className="flex flex-col">
                          <textarea
                            name="comment"
                            className="border mb-1 border-red-300 rounded"
                          ></textarea>
                          <input type="hidden" name="id" value={task._id} />
                          <button
                            type="submit"
                            className="bg-blue-700 px-2 py-1 rounded-sm text-white hover:bg-blue-900 hover:shadow-md"
                          >
                            Add comment
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="flex  md:flex-row gap-1 w-full">
                      <button
                        onClick={() => deleteHandler(task._id)}
                        className="bg-primary w-1/2 px-2 rounded-md text-white hover:bg-warning hover:shadow-md"
                        size="sm"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => notCompleteHandler(task._id)}
                        className="bg-red-700 px-2 w-1/2  rounded-md text-white hover:bg-blue-900 hover:shadow-md"
                        size="sm"
                      >
                        Not completed
                      </button>
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

export default CompleteTask;
