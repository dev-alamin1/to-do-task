import React from "react";

const AddTaskCard = () => {
  return (
    <div className="flex justify-center items-center pb-40">
      <div className="flex flex-col w-96 p-6 mt-5 rounded-md sm:p-10 bg-black text-white">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Task</h1>
        </div>
        <form
          novalidate=""
          action=""
          className="space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label for="email" className="block mb-2 text-sm">
                Task Name
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Task name.."
                className="w-full px-3 py-2 border rounded-md  bg-gray-900"
              />
            </div>

            


            <div>
              <div className="flex justify-between mb-2">
                <label for="password" className="text-sm">
                  Details
                </label>
                
              </div>
              <textarea id="message" type="text" placeholder="Details..." className="block w-full p-2 rounded border bg-gray-800"></textarea>
            </div>

            <div>
              <label for="email" className="block mb-2 text-sm">
                Image
              </label>
              <input
                type="file"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>

          </div>
          <div className="space-y-2">
            <div>
              <button
                type="button"
                className="w-full px-8 py-3 font-semibold rounded-md bg-blue-600 dark:text-gray-900"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskCard;
