import { createBrowserRouter } from 'react-router-dom';
import { Home, Register, Login, Single, Write, ErrorPage, Socket, ChatPage } from '../pages';
import { Layout } from '../layout';
import { Protected, ProtectedAuth } from './routeGuard';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

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
    path: '/socket',
    element: <Socket socket={socket} />,
  },
  {
    path: '/chat',
    element: <ChatPage socket={socket} />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
