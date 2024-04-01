import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { IUnidadeComodo } from '../../services/comodo.service';

interface cardProps {
    comodo: IUnidadeComodo;
    onEdit: () => void;
}

export default function CardComodo(props: cardProps) {
    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <div className="card mt-3 w-100">
                <div className="card-body d-flex flex-column justify-content-between">
                    <div className="d-flex">
                        <div className="flex-grow-1">
                            <h5 className="card-title pe-1">{props.comodo.descricao}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">
                                {props.comodo.tipoComodo.tipo}
                            </h6>
                        </div>
                        <Button
                            active={isActive}
                            onClick={() => {
                                setIsActive(!isActive);
                                props.onEdit();
                            }}
                            className="edit-icon"
                        >
                            <i className={`bi bi-pencil-square fs-4`}></i>
                        </Button>
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <Button className="btn-sm rounded-pill text-dark back-button">
                            {props.comodo.unidadeDispositivo.length} dispositivos
                        </Button>
                        <Button className="btn-sm rounded-pill text-dark back-button">
                            Automatizado
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
