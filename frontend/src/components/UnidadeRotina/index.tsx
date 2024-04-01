import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { IAutomatizacao } from '../../services/automatizacao.service';
import {
    DiasDaSemana,
    IRotina,
    useDeleteRotinaMutation,
    useGetRotinaQuery,
    useUpdateDiasRotinaMutation,
    useUpdateExecutarRotinaMutation,
    useUpdateHabilitaRotinaMutation,
} from '../../services/rotina.service';
import DiasIcone from '../DiasIcone';
import TimePickerView from '../TimePicker';
import { ToastContainer, toast } from 'react-toastify';

interface RotinaProps {
    rotina: IRotina;
    setarConfig: (isConfig: boolean, rotina: IRotina) => void;
}

enum StatusIcon {
    ACTIVE = 'bi bi-check-square-fill',
    INACTIVE = 'bi bi-dash-square',
}

export default function UnidadeRotina(props: RotinaProps) {
    interface ButtonProps {
        option: 'configurar' | 'excluir';
        id: string;
    }
    const [deleteRotina] = useDeleteRotinaMutation();
    const [habilitaRotina] = useUpdateHabilitaRotinaMutation();
    const [executarRotina] = useUpdateExecutarRotinaMutation();
    const {
        data: rotina,
        isLoading: isFecthing,
        refetch: atualizarRotina,
    } = useGetRotinaQuery(props.rotina.id);
    const [updateDias, { isLoading: isUpdating }] = useUpdateDiasRotinaMutation();

    function configurar() {
        props.setarConfig(true, props.rotina);
    }

    function excluirRotina() {
        if (rotina) deleteRotina(rotina.id);
    }

    function alternarHabilitacao() {
        if (rotina)
            habilitaRotina({ id: rotina.id, body: { habilitado: !rotina.habilitado } }).then(() => {
                atualizarRotina();
            });
    }

    function iniciarRotina() {
        if (rotina) {
            const automatizacoes: IAutomatizacao[] = rotina.automatizacao;
            const listaDeComandos: { unidadeDispositivoId: string; status: boolean }[] = [];
            automatizacoes.forEach((aut) => {
                listaDeComandos.push({
                    unidadeDispositivoId: aut.unidadeDispositivo.id,
                    status: aut.status,
                });
            });
            executarRotina({ body: listaDeComandos }).then(() => {
                toastSuccess('Rotina executada com sucesso!');
            });
        }
    }
    function toastSuccess(msg: string) {
        toast.success(msg, {
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

    return (
        <>
            {rotina ? (
                <>
                    <div className="d-flex borda-rot justify-content-between card-rotina my-2">
                        <div className="p-1 d-flex flex-column justify-content-evenly">
                            <div>
                                <span className="m-2 fw-semibold">
                                    {rotina.descricao}{' '}
                                    {isFecthing || isUpdating ? (
                                        <Spinner animation="border" size="sm" variant="secondary" />
                                    ) : null}
                                </span>
                                <i
                                    role="button"
                                    onClick={() => {
                                        alternarHabilitacao();
                                    }}
                                    className={`${rotina.habilitado ? StatusIcon.ACTIVE : StatusIcon.INACTIVE} ms-2`}
                                ></i>
                            </div>
                            <div className="mx-2 d-flex align-items-center">
                                <i
                                    className="bi bi-play-circle-fill fs-5"
                                    role="button"
                                    onClick={iniciarRotina}
                                ></i>
                                <span className="mx-2">|</span>
                                <DiasDaSemana />
                                <TimePickerView rotina={rotina} atualizarRotina={atualizarRotina} />
                            </div>
                        </div>
                        <div className="d-flex flex-column justify-content-evenly buttons-action-card">
                            <OptionButton option="configurar" id={rotina.id} />
                            <OptionButton option="excluir" id={rotina.id} />
                        </div>
                    </div>
                    <ToastContainer />
                </>
            ) : null}
        </>
    );

    function setarDia(dia: string) {
        const atualDias: DiasDaSemana = { ...props.rotina.diasDaSemana };

        switch (dia) {
            case 'segunda':
                atualDias['segunda'] = !atualDias['segunda'];
                break;
            case 'terca':
                atualDias['terca'] = !atualDias['terca'];
                break;
            case 'quarta':
                atualDias['quarta'] = !atualDias['quarta'];
                break;
            case 'quinta':
                atualDias['quinta'] = !atualDias['quinta'];
                break;
            case 'sexta':
                atualDias['sexta'] = !atualDias['sexta'];
                break;
            case 'sabado':
                atualDias['sabado'] = !atualDias['sabado'];
                break;
            case 'domingo':
                atualDias['domingo'] = !atualDias['domingo'];
                break;
            default:
                console.log('Dia da semana invalido');
                break;
        }
        updateDias({ id: props.rotina.id, body: atualDias });
    }

    function DiasDaSemana() {
        const diasDaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
        return diasDaSemana.map((dia, index) => {
            return (
                <div
                    key={index}
                    onClick={() => {
                        setarDia(dia);
                    }}
                >
                    <DiasIcone
                        letra={dia.charAt(0).toLocaleUpperCase() as 'S' | 'T' | 'Q' | 'D'}
                        isSelected={
                            props.rotina.diasDaSemana[
                                dia as
                                    | 'segunda'
                                    | 'terca'
                                    | 'quarta'
                                    | 'quinta'
                                    | 'sexta'
                                    | 'sabado'
                                    | 'domingo'
                            ]
                        }
                    />
                </div>
            );
        });
    }

    function OptionButton(bProps: ButtonProps) {
        const handleClick = () => {
            switch (bProps.option) {
                case 'configurar':
                    configurar();
                    break;
                case 'excluir':
                    try {
                        const confirmDelete = window.confirm('Você deseja realmente excluir?');
                        if (confirmDelete) {
                            excluirRotina();
                        }
                    } catch (error) {
                        console.error('Erro ao excluir rotina!', error);
                        window.confirm('Erro ao deletar');
                    }
                    break;
                default:
                    break;
            }
        };

        return (
            <Button variant="secondary" size="sm" className="d-flex w-100" onClick={handleClick}>
                {bProps.option === 'configurar' ? (
                    <>
                        <i className="bi bi-pencil-square justify-content-center"></i>
                        <span className="label-action-button"> Configurar</span>
                    </>
                ) : (
                    <>
                        <i className="bi bi-trash3 justify-content-center"></i>
                        <span className="label-action-button"> Excluir</span>
                    </>
                )}
            </Button>
        );
    }
}
