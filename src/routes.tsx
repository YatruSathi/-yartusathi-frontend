import { createBrowserRouter } from "react-router";
import { Login } from "./pages/login";
import { Home } from "./pages/home";

export default createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/home",
        element: <Home/>
    },
])



