import { createBrowserRouter } from "react-router-dom";
import AddTaskCard from "../../Components/Cards/AddTaskCard";
import Home from "../../Components/Pages/Home/Home";
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
            }
        ]
      }
])

export default router;