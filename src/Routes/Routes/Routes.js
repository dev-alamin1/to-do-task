import { createBrowserRouter } from "react-router-dom";
import Login from "../../Components/Auth/Login/Login";
import Register from "../../Components/Auth/Register/Register";
import AddTaskCard from "../../Components/Cards/AddTaskCard";
import CompleteTask from "../../Components/Pages/CompleteTask/CompleteTask";
import Home from "../../Components/Pages/Home/Home";
import Media from "../../Components/Pages/Media/Media";
import MediaDetails from "../../Components/Pages/Media/MediaDetails";
import MyTask from "../../Components/Pages/MyTask/MyTask";
import Main from "../../Layouts/Main";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
            },
            {
                path:'/media-task',
                element:<Media/>
            },

            {
                path:'/media-task-details/:id',
                loader: async({params})=>fetch(`https://todo-task-list-server.vercel.app/media-task-details/${params.id}`),
                element:<PrivateRoute><MediaDetails/></PrivateRoute>
            },

            {
                path:'/login',
                element:<Login/>
            }
            ,{
                path:'/register',
                element:<Register/>
            }
        ]
      }
])

export default router;