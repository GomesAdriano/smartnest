import { useState } from 'react';
import './index.css';
import ImagemNadaAqui from '../../assets/nothing-here-image.svg';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Spinner } from 'react-bootstrap';
import CardComodo from '../../components/CardComodo';
import { IUnidadeComodo, useGetUnidadesComodoQuery } from '../../services/comodo.service';
import CadastroComodo from '../../components/CadastroComodo';
import DispositivosDoComodo from '../../components/DispositivosDoComodo';
import RotinasDoComodo from '../../components/RotinasDoComodo';

export default function Comodos() {
    const [currentView, SetCurrentView] = useState<'dados' | 'dispositivos' | 'rotinas'>('dados');
    const [currentComodo, SetCurrentComodo] = useState<IUnidadeComodo | undefined>();
    const [isCadastroComodos, SetIsCadastroComodos] = useState<boolean>(false);

    function ListaComodos() {
        const { data: listaComodos, isLoading } = useGetUnidadesComodoQuery();

        if (isLoading) return <Spinner animation="border" size="sm" variant="secondary" />;

        if (!listaComodos) return <div>Sem comodos cadastradas no momento :/ </div>;

        return (
            <div className="col-md-3 overflow-y-auto scroll pe-5 pb-5">
                <h3>Cômodos</h3>
                <button
                    className="button-add w-100 h-25 bg-secondary-subtle"
                    onClick={() => {
                        handleCriarComodo();
                    }}
                >
                    <span className="icon-add fs-4">+</span>
                </button>
                {listaComodos.map((comodo, index) => (
                    <CardComodo
                        comodo={comodo}
                        key={index}
                        onEdit={() => {
                            popularEditComodo(comodo);
                        }}
                    />
                ))}
            </div>
        );
    }

    function Menu() {
        return (
            <ListGroup defaultActiveKey="#dados">
                <ListGroup.Item
                    onClick={() => SetCurrentView('dados')}
                    action
                    active={currentView === 'dados'}
                    href="#dados"
                >
                    Dados
                </ListGroup.Item>
                <ListGroup.Item
                    onClick={() => SetCurrentView('dispositivos')}
                    action
                    disabled={isCadastroComodos}
                    active={currentView === 'dispositivos'}
                    href="#dispositivos"
                >
                    Dispositivos
                </ListGroup.Item>
                <ListGroup.Item
                    onClick={() => {
                        SetCurrentView('rotinas');
                    }}
                    disabled={isCadastroComodos}
                    active={currentView === 'rotinas'}
                    action
                    href="#rotinas"
                >
                    Rotinas
                </ListGroup.Item>
            </ListGroup>
        );
    }

    function renderSecoes(secao: 'dados' | 'dispositivos' | 'rotinas') {
        switch (secao) {
            case 'dados':
                function resetState() {
                    SetIsCadastroComodos(false);
                    SetCurrentComodo(undefined);
                }
                return <CadastroComodo onReset={resetState} comodo={currentComodo} />;
            case 'dispositivos':
                return <DispositivosDoComodo comodoId={currentComodo!.id} />;
            case 'rotinas':
                return <RotinasDoComodo comodoId={currentComodo!.id} />;
            default:
                return null;
        }
    }

    function handleCriarComodo() {
        SetCurrentView('dados');
        SetCurrentComodo(undefined);
        SetIsCadastroComodos(true);
    }

    function popularEditComodo(comodo: IUnidadeComodo) {
        SetIsCadastroComodos(false);
        SetCurrentView('dados');
        SetCurrentComodo(comodo);
    }

    return (
        <>
            <div className="conteudo-principal">
                <div className="container-fluid">
                    <div className="row">
                        <ListaComodos />
                        <div className="col-md-9 formularios p-5 overflow-y-auto">
                            {(isCadastroComodos || currentComodo !== undefined) &&
                            !(isCadastroComodos && currentComodo !== undefined) ? (
                                <>
                                    <p className="fw-bold fs-3 mb-3 ">Atualizar cômodo</p>
                                    <Tab.Container
                                        id="list-group-tabs-example"
                                        defaultActiveKey="#dados"
                                    >
                                        <Row>
                                            <Col sm={2}>
                                                <Menu />
                                            </Col>
                                            <Col sm={10}>
                                                <Tab.Content>
                                                    {renderSecoes(currentView)}
                                                </Tab.Content>
                                            </Col>
                                        </Row>
                                    </Tab.Container>
                                </>
                            ) : (
                                <div className="d-flex flex-column mb-3 justify-content-center align-items-center h-100">
                                    <h4>Nada aqui!</h4>
                                    <img src={ImagemNadaAqui} alt="" className="mt-5" />
                                    <br />
                                    <p className="mt-5">
                                        Selecione um cômodo para editá-lo e visualizar seus
                                        dispositivos e automações
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
