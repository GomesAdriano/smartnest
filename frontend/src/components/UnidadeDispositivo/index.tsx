import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { useEffect, useState } from 'react';
import { iconDictionary } from '../../utils/disp-icons';
import {
    IUnidadeDispositivo,
    useDeleteUnidadeDispositivoMutation,
    useUpdateStatusMutation,
} from '../../services/unidade-dispositivo.service';
import { acoes, useUpdateDispositivosComodoMutation } from '../../services/comodo.service';

interface UnidadeProps {
    componente: 'dispositivo' | 'comodo';
    idComponente?: string | undefined;
    setCadastro?: (isCadastro: boolean) => void;
    unidadeDispositivo: IUnidadeDispositivo;
    alternarCriacaoEdicao?: (isCreate: boolean, unidade: IUnidadeDispositivo) => void;
    atualizar?: () => void;
}

export default function UnidadeDispositivo(props: UnidadeProps) {
    const [icone, SetIcone] = useState<string>('');
    const [deleteUnidade, { isLoading: isDeleting }] = useDeleteUnidadeDispositivoMutation();
    const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();
    const [updateDispositivosComodo, { isLoading: isSaving }] =
        useUpdateDispositivosComodoMutation();

    useEffect(() => {
        SetIcone(
            //prettier-ignore
            iconDictionary[
                props.unidadeDispositivo.dispositivo.categoriaDispositivo.id as | 1 | 2 | 3 | 4 | 5 | 6
            ],
        );
    }, [props]);

    interface ButtonProps {
        option: 'editUnity' | 'deleteUnity' | 'removerDoComodo';
        id?: string;
    }

    function OptionButton(bProps: ButtonProps) {
        const handleClick = () => {
            switch (bProps.option) {
                case 'deleteUnity':
                    try {
                        const confirmDelete = window.confirm(
                            'Você deseja excluir realmente este dispositivo?',
                        );
                        if (confirmDelete) {
                            deleteUnidade(props.unidadeDispositivo.id!);
                            props.setCadastro!(true);
                        }
                    } catch (error) {
                        console.error('Erro ao excluir dispositivo:', error);
                        window.confirm('Erro ao deletar');
                    }
                    break;
                case 'editUnity':
                    props.alternarCriacaoEdicao!(false, props.unidadeDispositivo);
                    break;
                case 'removerDoComodo':
                    updateDispositivosComodo({
                        id: props.idComponente!,
                        body: { acao: acoes.REMOVER, dispId: props.unidadeDispositivo.id! },
                    });
                    break;
                default:
                    console.log('Ocorreu um erro');
                    break;
            }
        };
        return (
            <Button variant="secondary" size="sm" className="d-flex w-100" onClick={handleClick}>
                {bProps.option === 'editUnity' ? (
                    <>
                        <i className="bi bi-pencil-square justify-content-center"></i>
                        <span className="label-action-button"> Editar</span>
                    </>
                ) : (
                    <>
                        <i className="bi bi-trash3 justify-content-center"></i>
                        <span className="label-action-button">
                            {' '}
                            {bProps.option === 'removerDoComodo' ? 'Remover do Comodo' : 'Excluir'}
                        </span>
                    </>
                )}
            </Button>
        );
    }

    function toggleSwitch() {
        updateStatus({
            id: props.unidadeDispositivo.id!,
            status: !props.unidadeDispositivo.status,
        }).then(() => {
            if (props.atualizar) props.atualizar();
        });
    }

    function renderButtons() {
        switch (props.componente) {
            case 'dispositivo':
                return (
                    <>
                        <OptionButton option="editUnity" id={props.unidadeDispositivo.id} />
                        <OptionButton option="deleteUnity" id={props.unidadeDispositivo.id} />
                    </>
                );
            case 'comodo':
                return (
                    <>
                        <OptionButton option="removerDoComodo" id={props.unidadeDispositivo.id} />
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <div
            className={
                `d-flex borda justify-content-between card-dispositivo ` +
                (props.unidadeDispositivo.status ? `borda-ligado` : `borda-desligado`)
            }
        >
            <div className="p-1 ">
                <div className="d-flex">
                    <span className="m-2 fw-semibold">
                        {props.unidadeDispositivo.descricao || 'nome_dispositivo'}
                    </span>
                    <div className="form-check form-switch m-2">
                        <input
                            className={
                                `form-check-input ` +
                                (props.unidadeDispositivo.status ? `ligado` : `desligado`)
                            }
                            type="checkbox"
                            role="switch"
                            checked={props.unidadeDispositivo.status}
                            id={`flexSwitchCheck${
                                props.unidadeDispositivo.status ? `Checked` : `Default`
                            }`}
                            onChange={toggleSwitch}
                        />
                        <label
                            className={
                                `form-check-label ` +
                                (props.unidadeDispositivo.status ? `ligado` : `desligado`)
                            }
                            htmlFor={`flexSwitchCheck${
                                props.unidadeDispositivo.status ? `Checked` : `Default`
                            }`}
                        >
                            {props.unidadeDispositivo.status ? `Ligado` : `Desligado`}
                            {isUpdating || isDeleting || isSaving ? (
                                <Spinner animation="border" size="sm" variant="secondary" />
                            ) : null}
                        </label>
                    </div>
                </div>
                <div>
                    <i
                        className={`${icone || `bi bi-thermometer-half`} rounded-circle background-icone ms-2`}
                    ></i>
                    <span className="tipo-dispositivo ms-2">
                        {props.unidadeDispositivo.dispositivo.categoriaDispositivo.categoria}
                    </span>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-evenly buttons-action-card">
                {renderButtons()}
            </div>
        </div>
    );
}
