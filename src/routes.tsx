import { createBrowserRouter } from "react-router";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Dashboard } from "./layout/dashboard";
import { ProfilePage } from "./pages/profile/profile-page"
import { Events } from "./pages/events/events";
import EventDetails from "./pages/events/event-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Dashboard />, // Parent route with sidebar and app bar
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "events",
        element: <Events />
      },
      {
        path: "events/:id",
        element: <EventDetails />
      },
      {
        path: "user-profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
