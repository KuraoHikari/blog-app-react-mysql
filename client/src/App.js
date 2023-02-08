import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index';
import { authCurrentUser } from './store/auth/action';
import { useDispatch } from 'react-redux';
import './style.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCurrentUser());
  }, []);

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
