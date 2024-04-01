import { Button, Container, Modal, Spinner } from 'react-bootstrap';
import { IUnidadeDispositivo } from '../../services/unidade-dispositivo.service';
import {
    IUnidadeComodo,
    acoes,
    useUpdateDispositivosComodoMutation,
} from '../../services/comodo.service';
import { iconDictionary } from '../../utils/disp-icons';
import { useAddAutomatizacaoMutation } from '../../services/automatizacao.service';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryActionCreatorResult,
    QueryDefinition,
} from '@reduxjs/toolkit/query';

interface modalProps {
    show: boolean;
    onHide: () => void;
    onClose: () => void;
    listadisp: IUnidadeDispositivo[];
    idparaadicao: string;
    carregando: boolean;
    aftercall: () => QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
            'comodo',
            IUnidadeComodo,
            'unidadeComodoApi'
        >
    >;
    componente: 'comodoDispositivo' | 'comodoRotina';
}

export default function ModalDispositivos(props: modalProps) {
    const [updateDispositivosComodo, { isLoading: isSaving }] =
        useUpdateDispositivosComodoMutation();
    const [addAutomacao, { isLoading: isAdding }] = useAddAutomatizacaoMutation();

    function onAdd(disp: IUnidadeDispositivo) {
        switch (props.componente) {
            case 'comodoDispositivo':
                updateDispositivosComodo({
                    id: props.idparaadicao,
                    body: { acao: acoes.ADICIONAR, dispId: disp.id },
                });
                break;
            case 'comodoRotina':
                addAutomacao({
                    rotinaId: props.idparaadicao,
                    unidadeDispositivoId: disp.id,
                    status: false,
                }).then(() => props.aftercall());
                break;
            default:
                break;
        }
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header className="headerModal border border-white border-5">
                <Modal.Title id="contained-modal-title-vcenter">
                    Adicionar dispositivo{' '}
                    {isSaving || isAdding ? (
                        <Spinner animation="border" size="sm" variant="secondary" />
                    ) : null}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                {props.carregando ? (
                    <Spinner animation="border" size="sm" variant="secondary" />
                ) : (
                    <Container>
                        <span className="fs-6">
                            Escolha um dispositivo para adicionar ao cômodo:
                        </span>
                        {props.listadisp.length > 0 ? (
                            props.listadisp.map((disp, index) => {
                                const iconId: 1 | 2 | 3 | 4 | 5 | 6 = disp.dispositivo
                                    .categoriaDispositivo.id as 1 | 2 | 3 | 4 | 5 | 6;
                                return (
                                    <div key={index} className="border m-2">
                                        <div
                                            role="button"
                                            onClick={() => {
                                                onAdd(disp);
                                                props.onHide();
                                            }}
                                            className="m-2 d-flex align-items-center"
                                        >
                                            <i className={`${iconDictionary[iconId]} me-2`}></i>{' '}
                                            {disp.descricao}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Não há dispositivos sem cômodos associados no momento :(</p>
                        )}
                    </Container>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onClose}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}
