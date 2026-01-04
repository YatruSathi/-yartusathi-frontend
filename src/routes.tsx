import Favorite from './pages/home/favorite';
import { createBrowserRouter } from 'react-router';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Dashboard } from './layout/dashboard';
import { ProfilePage } from './pages/profile/profile-page';
import { Notification } from './pages/events/notifications';
import { Events } from './pages/events/events';
import EventDetails from './pages/events/event-details';
import AddEventForm from './pages/events/add-event-form';
import MyCreatedEvents from './pages/events/my-events';
import Chatbox from './pages/chat/chatbox';
import SettingsPage from './pages/setting/setting';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: <Dashboard />, // Parent route with sidebar and app bar
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'events/:id',
        element: <EventDetails />,
      },
      {
        path: 'events/create',
        element: <AddEventForm />,
      },
      {
        path: 'user-profile',
        element: <ProfilePage />,
      },
      {
        path: 'favorite',
        element: <Favorite />,
      },
      {
        path: 'notification',
        element: <Notification />,
      },
      {
        path: 'chatbot',
        element: <Chatbox />,
      },
      {
        path: 'my-events',
        element: <MyCreatedEvents />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;
