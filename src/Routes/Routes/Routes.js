import { createBrowserRouter } from "react-router-dom";
import AddTaskCard from "../../Components/Cards/AddTaskCard";
import CompleteTask from "../../Components/Pages/CompleteTask/CompleteTask";
import Home from "../../Components/Pages/Home/Home";
import MyTask from "../../Components/Pages/MyTask/MyTask";
import Main from "../../Layouts/Main";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/add-task',
                element:<AddTaskCard/>
            },
            {
                path:'/my-task',
                element:<MyTask/>
            },
            {
                path:'/complete-task',
                element:<CompleteTask/>
            }
        ]
      }
])

export default router;