import { createBrowserRouter } from "react-router-dom";
import Register from "../Page/Register";
import TaskManage from "../Page/TaskManage";
import PrivateRoute from "../AuthProvider/PrivateRoute";
import ErrorPage from "../Page/ErrorPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Register></Register>,
    },
    {
      path: "/task",
      element: <PrivateRoute><TaskManage></TaskManage></PrivateRoute>
    },
    {
      path: '*',
      element: <ErrorPage></ErrorPage>
    }
  ]);

export default router;