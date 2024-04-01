import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { useEffect, useState } from 'react';
import { iconDictionary } from '../../utils/disp-icons';
import { IUnidadeDispositivo } from '../../services/unidade-dispositivo.service';
import {
    useDeleteAutomatizacaoMutation,
    useGetAutomatizacaoQuery,
    useUpdateAlteraAutomatizacaoMutation,
} from '../../services/automatizacao.service';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryActionCreatorResult,
    QueryDefinition,
} from '@reduxjs/toolkit/query';
import { IUnidadeComodo } from '../../services/comodo.service';

interface UnidadeAutProps {
    idAutomatizacao: string;
    unidadeDispositivo: IUnidadeDispositivo;
    atualizarLista: () => QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
            'comodo',
            IUnidadeComodo,
            'unidadeComodoApi'
        >
    >;
}

export default function UnidadeAutomatizacao(props: UnidadeAutProps) {
    const [icone, SetIcone] = useState<string>('');
    const [updateAutomatizacao, { isLoading: isSwiching }] = useUpdateAlteraAutomatizacaoMutation();
    const [deleteAutomatizacao, { isLoading: isDeleting }] = useDeleteAutomatizacaoMutation();
    const {
        data: automatizacao,
        isLoading,
        refetch: atualizarAutomatizacao,
    } = useGetAutomatizacaoQuery(props.idAutomatizacao);

    useEffect(() => {
        SetIcone(
            //prettier-ignore
            iconDictionary[
                props.unidadeDispositivo.dispositivo.categoriaDispositivo.id as | 1 | 2 | 3 | 4 | 5 | 6
            ],
        );
    }, [props]);

    if (isLoading) {
        return <Spinner animation="border" size="sm" variant="secondary" />;
    }

    function onDelete() {
        deleteAutomatizacao(props.idAutomatizacao).then(() => props.atualizarLista());
    }

    function toggleSwitch() {
        updateAutomatizacao({
            id: props.idAutomatizacao,
            body: { status: !automatizacao?.status },
        }).then(() => {
            atualizarAutomatizacao();
        });
    }

    return automatizacao ? (
        <div
            className={
                `d-flex borda-aut justify-content-between card-dispositivo ` +
                (automatizacao!.status ? `borda-ligado-aut` : `borda-desligado-aut`)
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
                                (automatizacao!.status ? `ligado-aut` : `desligado-aut`)
                            }
                            type="checkbox"
                            role="switch"
                            checked={automatizacao!.status}
                            id={`flexSwitchCheck${automatizacao!.status ? `Checked` : `Default`}`}
                            onChange={toggleSwitch}
                        />
                        <label
                            className={
                                `form-check-label ` +
                                (automatizacao!.status ? `ligado-aut` : `desligado-aut`)
                            }
                            htmlFor={`flexSwitchCheck${
                                automatizacao!.status ? `Checked` : `Default`
                            }`}
                        >
                            {automatizacao!.status ? `Ligar` : `Desligar`}
                            {isDeleting || isSwiching ? (
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
                <Button variant="secondary" size="sm" className="d-flex w-100" onClick={onDelete}>
                    {
                        <>
                            <i className="bi bi-trash3 justify-content-center"></i>
                            <span className="label-action-button">Excluir</span>
                        </>
                    }
                </Button>
            </div>
        </div>
    ) : null;
}
