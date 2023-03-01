import Home from './pages/Home';
import Auth from './pages/Auth';
import Item from './pages/Item';
import User from './pages/User';
import Collection from './pages/Collection';
import Admin from './pages/Admin';
import Error from './pages/Error';

export const router = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/items/:itemId',
    element: <Item />,
  },
  {
    path: '/users/:userId',
    element: <User />,
  },
  {
    path: '/collections/:collectionId',
    element: <Collection />,
  },
  {
    path: '/login',
    element: <Auth />,
  },
  {
    path: '/signup',
    element: <Auth />,
  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <Error />,
  },
];
