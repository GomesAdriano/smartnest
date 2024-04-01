import { Outlet } from 'react-router-dom';
import TopoBackground from '../../components/TopoBackground';
import Sidebar from '../../components/Sidebar';

export default function NavBarLayout() {
    return (
        <>
            <TopoBackground />
            <Sidebar />
            <Outlet />
        </>
    );
}
