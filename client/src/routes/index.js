import { createBrowserRouter } from 'react-router-dom';
import { Home, Register, Login, Single, Write, ErrorPage } from '../pages';
import { Layout } from '../layout';
import { Protected, ProtectedAuth } from './routeGuard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/post/:id',
        element: <Single />,
      },
      {
        path: '/write',
        element: (
          <ProtectedAuth>
            <Write />
          </ProtectedAuth>
        ),
      },
    ],
  },
  {
    path: '/register',
    element: (
      <Protected>
        <Register />
      </Protected>
    ),
  },
  {
    path: '/login',
    element: (
      <Protected>
        <Login />
      </Protected>
    ),
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
