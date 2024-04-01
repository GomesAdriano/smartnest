import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dispositivo from './pages/Dispositivos';
import SideTopoLayout from './layout/SideTopoLayout';
import Comodos from './pages/Comodos';

const estaAutenticado = () => {
    return localStorage.getItem('user') !== null;
};

const guardaRotasInternas = (element: JSX.Element) => {
    if (!estaAutenticado() && window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
    return element;
};

const redirect = (element: JSX.Element) => {
    if (
        !(
            window.location.pathname.includes('/login') ||
            window.location.pathname.includes('/dispositivos') ||
            window.location.pathname.includes('/comodos')
        )
    )
        window.location.href = '/login';
    return element;
};

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: redirect(<></>),
    },
    {
        element: guardaRotasInternas(<SideTopoLayout />),
        children: [
            {
                path: '/dispositivos',
                element: guardaRotasInternas(<Dispositivo />),
            },
            {
                path: '/comodos',
                element: guardaRotasInternas(<Comodos />),
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
