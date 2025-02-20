import { createBrowserRouter } from "react-router-dom";
import Register from "../Page/Register";
import TaskManage from "../Page/TaskManage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Register></Register>,
    },
    {
      path: "/task",
      element: <TaskManage></TaskManage>
    },
  ]);

export default router;