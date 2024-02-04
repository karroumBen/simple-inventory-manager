import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import NewProduct from '../pages/NewProduct';
import Login from '../pages/Login';
import UserSignUp from '../pages/UserSignUp';
import Layout from "../components/Layout";
import EditProduct from "../pages/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "product/add",
        element: <NewProduct/>
      },
      {
        path: "product/edit",
        element: <EditProduct/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <UserSignUp/>
  }
]);

export default router;