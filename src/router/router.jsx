import { createBrowserRouter } from "react-router-dom";
import Register from "../Page/Register";
import TaskManage from "../Page/TaskManage";
import PrivateRoute from "../AuthProvider/PrivateRoute";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Register></Register>,
    },
    {
      path: "/task",
      element: <PrivateRoute><TaskManage></TaskManage></PrivateRoute>
    },
  ]);

export default router;