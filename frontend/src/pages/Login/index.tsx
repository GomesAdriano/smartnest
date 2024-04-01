import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { CreateUser, DoLoginUser, IUsuario } from '../../services/login.service';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-main.svg';
import './index.css';
import { Image } from 'react-bootstrap';

export default function Login() {
    const [email, SetEmail] = useState('');
    const [senha, SetSenha] = useState('');
    const [confirma, SetConfirma] = useState('');
    const [nome, SetNome] = useState('');
    const [isLogin, SetIsLogin] = useState(true);
    const [tipoSenha, SetTipoSenha] = useState('password');
    const [tipoConfirma, SetTipoConfirma] = useState('password');
    const eyeOff = 'bi bi-eye-slash';
    const eyeOn = 'bi bi-eye';
    const [iconSenha, SetIconSenha] = useState(eyeOn);
    const [iconConfirma, SetIconConfirma] = useState(eyeOn);

    const navigate = useNavigate();

    function LoginButton() {
        return (
            <div className="d-grid col-12">
                <Button
                    className="color-principal rounded-pill fw-bold"
                    onClick={() => {
                        if (isLogin)
                            DoLogin().then(() => {
                                navigate('/dispositivos');
                            });
                        else DoCreateUser();
                    }}
                >
                    {isLogin ? 'Entrar' : 'Criar conta'}
                </Button>
            </div>
        );
    }

    function ToastError(msg: string) {
        toast.error(msg, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'dark',
        });
    }

    function resetCampos() {
        SetNome('');
        SetEmail('');
        SetSenha('');
        SetConfirma('');
    }

    const handleEyeToggle = (campo: string) => {
        switch (campo) {
            case 'senha':
                if (tipoSenha === 'password') {
                    SetIconSenha(eyeOff);
                    SetTipoSenha('text');
                } else {
                    SetIconSenha(eyeOn);
                    SetTipoSenha('password');
                }
                break;
            case 'confirma':
                if (tipoConfirma === 'password') {
                    SetIconConfirma(eyeOff);
                    SetTipoConfirma('text');
                } else {
                    SetIconConfirma(eyeOn);
                    SetTipoConfirma('password');
                }
        }
    };

    async function DoLogin() {
        try {
            const res: IUsuario = await DoLoginUser(email, senha);
            localStorage.setItem('user', JSON.stringify(res));
        } catch (error) {
            ToastError('Verifique suas credências e tente novamente');
        }
    }

    async function DoCreateUser() {
        try {
            await CreateUser(nome, email, senha);
            SetIsLogin(true);
            resetCampos();
            navigate('/login');
        } catch (error) {
            ToastError('Verifique suas credências e tente novamente');
        }
    }

    return (
        <Container fluid className="">
            <ToastContainer />
            <Row>
                <Col
                    xs={12}
                    md={7}
                    className="background-esq padding-conteudo vh-100 text-white d-flex flex-column align-items-center justify-content-center"
                >
                    <div className="align-self-start">
                        <Image src={Logo} width={141} title="logo" />
                    </div>
                    <div className="flex-grow-1 d-flex justify-content-center flex-column text-start">
                        <h1 className="fw-semibold text-color-secondary">
                            Controle em <br /> suas mãos
                        </h1>
                        <p className="fs-4 fw-light text-color-secondary">
                            Desperte a inteligência em cada canto da sua casa! Personalize seus
                            espaços, conecte-se com facilidade e automatize sua rotina. Transforme
                            seu lar com nosso software: mais do que uma casa, uma experiência
                            inteligente!
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={5} className="d-flex align-items-center text-color-primary">
                    <div className="w-100 h-100 padding-conteudo flex-column d-flex justify-content-between ">
                        {!isLogin ? (
                            <div className="login">
                                <h2 className="fw-bold fs-1">Cadastro</h2>
                                <p className="fs-5">Crie sua conta</p>
                            </div>
                        ) : (
                            <div className="login">
                                <h2 className="fw-bold fs-1">Login</h2>
                                <p className="fs-5">Entre na conta</p>
                            </div>
                        )}

                        <Form>
                            {!isLogin ? (
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        onChange={(e) => SetNome(e.target.value)}
                                        className="form-control-lg"
                                        type="email"
                                        required
                                    />
                                </Form.Group>
                            ) : null}
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    onChange={(e) => SetEmail(e.target.value)}
                                    type="email"
                                    className="form-control-lg"
                                    required
                                    value={email}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Senha</Form.Label>
                                <div className="d-flex align-items-center position-relative">
                                    <Form.Control
                                        onChange={(e) => SetSenha(e.target.value)}
                                        type={tipoSenha}
                                        value={senha}
                                        className="form-control-lg"
                                        required
                                    />
                                    <span
                                        className="flex justify-around items-center p-2 position-absolute end-0"
                                        onClick={() => handleEyeToggle('senha')}
                                    >
                                        <i className={iconSenha}></i>
                                    </span>
                                </div>
                            </Form.Group>
                            {!isLogin ? (
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirme sua Senha</Form.Label>
                                    <div className="d-flex align-items-center position-relative">
                                        <Form.Control
                                            onChange={(e) => SetConfirma(e.target.value)}
                                            type={tipoConfirma}
                                            value={confirma}
                                            className="form-control-lg"
                                            required
                                        />
                                        <span
                                            className="flex justify-around items-center p-2 position-absolute end-0"
                                            onClick={() => handleEyeToggle('confirma')}
                                        >
                                            <i className={iconConfirma}></i>
                                        </span>
                                    </div>
                                </Form.Group>
                            ) : null}

                            <LoginButton />
                        </Form>
                        <div className="text-center mt-3">
                            <p>{isLogin ? 'Não possui conta?' : 'Já possui conta?'}</p>
                            <Button
                                variant="link"
                                className="text-decoration-none"
                                onClick={() => {
                                    SetIsLogin(!isLogin);
                                    resetCampos();
                                }}
                            >
                                {isLogin ? (
                                    <>
                                        <i className="bi bi-box-arrow-in-right"></i> Cadastre-se
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-box-arrow-in-right"></i> Fazer Login
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
