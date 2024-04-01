import { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useGetTiposComodoQuery } from '../../services/tipo-comodo.service';
import {
    IUnidadeComodo,
    useAddUnidadeComodoMutation,
    useDeleteUnidadeComodoMutation,
    useUpdateUnidadeComodoMutation,
} from '../../services/comodo.service';

interface cadastroComodoProps {
    comodo: IUnidadeComodo | undefined;
    onReset: () => void;
}

export default function CadastroComodo(props: cadastroComodoProps) {
    const [inputTipoComodo, SetInputTipoComodo] = useState<number>(0);
    const [nomeComodo, SetNomeComodo] = useState<string>('');
    const { data: listaTipoComodo, isLoading } = useGetTiposComodoQuery();
    const [addUnidadeComodo, { isLoading: isSaving }] = useAddUnidadeComodoMutation();
    const [updateUnidadeComodo, { isLoading: isUpdating }] = useUpdateUnidadeComodoMutation();
    const [deleteUnidadeComodo, { isLoading: isDeleting }] = useDeleteUnidadeComodoMutation();

    useEffect(() => {
        props.comodo ? SetInputTipoComodo(props.comodo!.tipoComodo.id) : SetInputTipoComodo(0);
        props.comodo ? SetNomeComodo(props.comodo.descricao) : SetNomeComodo('');
    }, [props]);

    if (isLoading) return <Spinner animation="border" size="sm" variant="secondary" />;

    if (!listaTipoComodo) return <div>Sem comodos cadastradas no momento :/ </div>;

    function handleSalvarComodo() {
        if (!props.comodo) {
            addUnidadeComodo({ descricao: nomeComodo, tipoComodoId: inputTipoComodo }).then(() => {
                props.onReset();
            });
        } else {
            updateUnidadeComodo({
                id: props.comodo.id,
                body: { descricao: nomeComodo, tipoComodoId: inputTipoComodo },
            });
        }
    }
    function handleDelete() {
        deleteUnidadeComodo(props.comodo!.id);
        props.onReset();
    }

    return (
        <div>
            <h4>
                Dados do cômodo{' '}
                {isSaving || isUpdating || isDeleting ? (
                    <Spinner animation="border" size="sm" variant="secondary" />
                ) : null}
            </h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                        value={inputTipoComodo}
                        onChange={(e) => {
                            SetInputTipoComodo(parseInt(e.target.value));
                        }}
                    >
                        <option value={0}>Selecione a categoria</option>
                        {listaTipoComodo.map((tipo, index) => {
                            return (
                                <option value={tipo.id} key={index + 1}>
                                    {tipo.tipo}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome do cômodo"
                        value={nomeComodo}
                        onChange={(e) => SetNomeComodo(e.target.value)}
                    />
                </Form.Group>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Button
                        className="w-50"
                        variant="primary"
                        onClick={() => {
                            handleSalvarComodo();
                        }}
                        disabled={inputTipoComodo === 0}
                    >
                        Salvar
                    </Button>
                </div>
            </Form>
            {props.comodo ? (
                <div className="mt-5 p-4 border rounded bg-light">
                    <h5>Excluir cômodo</h5>
                    <p>
                        Ao excluir o cômodo, todas os dados relacionados a ele serão excluídos,
                        incluindo a lista de dispositivos e rotinas.
                    </p>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <Button
                            onClick={() => {
                                handleDelete();
                            }}
                            variant="danger w-50"
                        >
                            Deletar permanentemente
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
