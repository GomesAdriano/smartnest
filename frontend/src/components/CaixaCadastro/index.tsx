import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import { Button, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {
    ICategoriaDispositivo,
    useGetCategoriasDispositivoQuery,
} from '../../services/categoria-dispositivo.service';
import {
    IDispositivo,
    useGetDispositivosPorCategoriaQuery,
} from '../../services/dispositivo.service';
import {
    IUnidadeDispositivo,
    useAddUnidadeDispositivoMutation,
    useUpdateUnidadeDispositivoMutation,
} from '../../services/unidade-dispositivo.service';
import { useGetHADispositivosQuery } from '../../services/home.assistant.service';

interface caixaProps {
    setCadastro: (isCadastro: boolean) => void;
    isCreate: boolean;
    unidade: IUnidadeDispositivo;
}

export default function CaixaCadastro(props: caixaProps) {
    const [categoria, SetCategoria] = useState<ICategoriaDispositivo>();
    const [dispositivo, SetDispositivo] = useState<IDispositivo>();
    const [addUnidadeDisp, { isLoading }] = useAddUnidadeDispositivoMutation();
    const [descricao, SetDescricao] = useState('');
    const [isCadastro, SetIsCadastro] = useState(true);
    const [isCategoriaSelected, SetIsCategoriaSelected] = useState(false);
    const [isDispositivoSelected, SetIsDispositivoSelected] = useState(false);
    const [inputCatValue, SetInputCatValue] = useState<number>(0);
    const [inputDisValue, SetInputDisValue] = useState<number>(0);
    const [updateUnidadeDispositivo, { isLoading: isUpdating }] =
        useUpdateUnidadeDispositivoMutation();

    useEffect(() => {
        SetIsCadastro(props.isCreate);
        if (!props.isCreate) {
            popularEdicao();
        } else {
            resetCampos();
        }
    }, [props]);

    function popularEdicao() {
        const res: IUnidadeDispositivo = props.unidade;
        SetIsCategoriaSelected(true);
        SetIsDispositivoSelected(true);
        SetCategoria(res.dispositivo.categoriaDispositivo);
        SetInputCatValue(res.dispositivo.categoriaDispositivo.id);
        SetDispositivo(res.dispositivo);
        SetInputDisValue(res.dispositivo.id);
        SetDescricao(res.descricao);
    }

    function resetCampos() {
        SetCategoria(undefined);
        SetInputCatValue(0);
        SetIsCategoriaSelected(false);
        SetDispositivo(undefined);
        SetInputDisValue(0);
        SetIsDispositivoSelected(false);
        SetDescricao('');
    }

    function handleSaveEdit() {
        updateUnidadeDispositivo({
            id: props.unidade.id,
            body: { descricao: descricao, dispositivoId: dispositivo!.id },
        });
        resetCampos();
        props.setCadastro(true);
    }

    function salvarUnidade() {
        addUnidadeDisp({ descricao: descricao, dispositivoId: dispositivo!.id });
        resetCampos();
    }

    function handleSave() {
        salvarUnidade();
        //função callback para renderizar o componente pai
        props.setCadastro(true);
    }

    function SelectCategoria() {
        const { data: categorias } = useGetCategoriasDispositivoQuery();

        if (!categorias) return null;

        return (
            <Form.Group className="mb-3 mt-4">
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                    onChange={(e) => {
                        SetInputCatValue(parseInt(e.target.value));
                        if (e.target.value != '0') {
                            SetCategoria(
                                categorias.find((cat) => cat.id === parseInt(e.target.value)),
                            );
                            SetIsCategoriaSelected(true);
                        } else {
                            SetCategoria(undefined);
                            SetIsCategoriaSelected(false);
                            SetIsDispositivoSelected(false);
                            SetDescricao('');
                        }
                    }}
                    className="form-control-lg"
                    required
                    value={inputCatValue}
                >
                    <option value={0}>Escolha uma opção</option>
                    {categorias.map((categoria, index) => {
                        return (
                            <option value={categoria.id} key={index + 1}>
                                {categoria.categoria}
                            </option>
                        );
                    })}
                </Form.Select>
            </Form.Group>
        );
    }

    function SelectDispositivo() {
        if (!isCategoriaSelected) return null;

        const { data: dispositivos } = useGetDispositivosPorCategoriaQuery(categoria!.id);
        if (!dispositivos) return null;

        return (
            <Form.Group className="mb-3">
                <Form.Label>Dispositivo</Form.Label>
                <Form.Select
                    onChange={(e) => {
                        SetInputDisValue(parseInt(e.target.value));
                        if (e.target.value != '0') {
                            SetDispositivo(
                                dispositivos.find((dis) => dis.id === parseInt(e.target.value)),
                            );
                            SetIsDispositivoSelected(true);
                        } else {
                            SetDispositivo(undefined);
                            SetIsDispositivoSelected(false);
                            SetDescricao('');
                        }
                    }}
                    value={inputDisValue}
                    className="form-control-lg"
                    required
                >
                    <option value={0}>Escolha uma opção</option>
                    {dispositivos.map((dispositivo, index) => {
                        return (
                            <option value={dispositivo.id} key={index + 1}>
                                {dispositivo.dispositivo}
                            </option>
                        );
                    })}
                </Form.Select>
            </Form.Group>
        );
    }

    return (
        <Form className="formulario-dispositivo">
            <h4> {isCadastro || isLoading ? 'Cadastro' : 'Atualização'} de dispositivo</h4>
            {isUpdating ? <Spinner animation="border" size="sm" variant="secondary" /> : null}

            <SelectCategoria />

            <SelectDispositivo />

            <Form.Group
                className="mb-3"
                style={{
                    display: isDispositivoSelected ? 'block' : 'none',
                }}
            >
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    onChange={(e) => SetDescricao(e.target.value)}
                    required
                    value={descricao}
                    placeholder="Descreva seu dispositivo"
                />
            </Form.Group>

            <div className="botoes">
                {!isCadastro ? (
                    <>
                        <Button
                            className="botao-secundario"
                            onClick={() => {
                                SetIsCadastro(true);
                                resetCampos();
                            }}
                        >
                            Cancelar
                        </Button>
                    </>
                ) : null}
                <Button
                    className="botao-principal"
                    onClick={() => {
                        if (isCadastro) handleSave();
                        else handleSaveEdit();
                    }}
                >
                    Salvar
                </Button>
            </div>
        </Form>
    );
}
