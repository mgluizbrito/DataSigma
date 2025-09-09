import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/Home';
import TablePage from '../pages/Table';
import TextPage from '../pages/Text';
import ClassPage from '../pages/Class';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'table', element: <TablePage /> },
      { path: 'text', element: <TextPage /> },
      { path: 'class', element: <ClassPage /> },
    ],
  },
]);

export default router