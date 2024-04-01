import './index.css';
import LogoAzul from '../../assets/logo/logo-azul.svg';
import { Image } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Logout } from '../../services/login.service';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const current = window.location.pathname;

    async function LogoutUser() {
        localStorage.clear();
        await Logout();
        navigate('/login');
    }

    return (
        <>
            <header>
                <div className="sidebar">
                    <div className="up-content">
                        <div className="logo">
                            <Image src={LogoAzul} width={35} title="logo" />
                        </div>
                        <div className="icons">
                            <a href="#">
                                <i className="bi bi-box"></i>
                            </a>
                            <a
                                href="/dispositivos"
                                className={current === '/dispositivos' ? 'active' : ''}
                            >
                                <i className="bi bi-plugin"></i>
                            </a>
                            <a href="/comodos" className={current === '/comodos' ? 'active' : ''}>
                                <i className="bi bi-house-add"></i>
                            </a>
                            <a href="#">
                                <i className="bi bi-gear"></i>
                            </a>
                        </div>
                    </div>
                    <div className="down-content">
                        <a href="#" onClick={() => LogoutUser()}>
                            <i className="bi bi-box-arrow-left"></i>
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}
