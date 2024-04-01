import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { useEffect, useState } from 'react';
import { iconDictionary } from '../../utils/disp-icons';
import {
    IUnidadeIntegrado,
    useUpdateHADStatusMutation,
} from '../../services/home.assistant.service';

interface UnidadeIntegradoProps {
    componente: 'dispositivo' | 'comodo';
    idComponente?: string | undefined;
    unidadeDispositivo: IUnidadeIntegrado;
    atualizar?: () => void;
    atualizando: boolean;
}

export default function UnidadeIntegrado(props: UnidadeIntegradoProps) {
    const [icone, SetIcone] = useState<string>('');
    const [updateStatus, { isLoading: isUpdating }] = useUpdateHADStatusMutation();
    let loading: boolean = false;

    useEffect(() => {
        SetIcone(iconDictionary[1]);
    }, [props]);

    interface ButtonProps {
        option: 'homeConfig' | 'removerDoComodo';
        id?: string;
    }

    function OptionButton(bProps: ButtonProps) {
        return (
            <Button
                variant="secondary"
                size="sm"
                className="d-flex w-100 pointer-auto"
                href="http://localhost:8123/config/devices/dashboard?historyBack=1&domain=tuya"
                target="_blank"
            >
                <i className="bi bi-pencil-square justify-content-center"></i>
                <span className="label-action-button"> Abrir Home-Assistant</span>
            </Button>
        );
    }

    function toggleSwitch() {
        loading = true;
        updateStatus({
            entity_id: props.unidadeDispositivo.entity_id!,
            state: props.unidadeDispositivo.state === 'off' ? 'on' : 'off',
        });
    }

    function renderButtons() {
        switch (props.componente) {
            case 'dispositivo':
                return <OptionButton option="homeConfig" id={props.unidadeDispositivo.entity_id} />;
            case 'comodo':
                break;
            default:
                return null;
        }
    }

    function unavailable() {
        switch (props.unidadeDispositivo.state) {
            case 'unavailable':
                return 'borda-unavailable';
            case 'on':
                return 'borda-int borda-ligado-int';
            case 'off':
                return 'borda-int borda-desligado-int';
        }
    }

    return (
        <div
            className={`d-flex borda-int justify-content-between card-dispositivo ` + unavailable()}
        >
            <div className="p-1 ">
                <div className="d-flex">
                    <span className="m-2 fw-semibold">
                        {props.unidadeDispositivo.attributes.friendly_name || 'nome_dispositivo'}
                    </span>
                    <div className="form-check form-switch m-2">
                        <input
                            className={
                                `form-check-input ` +
                                (props.unidadeDispositivo.state === 'on'
                                    ? `ligado-int`
                                    : `desligado-int`)
                            }
                            type="checkbox"
                            role="switch"
                            checked={props.unidadeDispositivo.state === 'on'}
                            id={`flexSwitchCheck${
                                props.unidadeDispositivo.state === 'on' ? `Checked` : `Default`
                            }`}
                            onChange={toggleSwitch}
                        />
                        <label
                            className={
                                `form-check-label ` +
                                (props.unidadeDispositivo.state === 'on'
                                    ? `ligado-int`
                                    : props.unidadeDispositivo.state === 'off'
                                      ? 'desligado-int'
                                      : 'indisponivel')
                            }
                            htmlFor={`flexSwitchCheck${
                                props.unidadeDispositivo.state === 'on' ? `Checked` : `Default`
                            }`}
                        >
                            {props.unidadeDispositivo.state === 'on'
                                ? `Ligado `
                                : props.unidadeDispositivo.state === 'off'
                                  ? 'Desligado '
                                  : 'Sem conexão '}
                            {isUpdating || loading || props.atualizando ? (
                                <Spinner animation="border" size="sm" variant="secondary" />
                            ) : null}
                        </label>
                    </div>
                </div>
                <div>
                    <i className={`${icone} rounded-circle background-icone ms-2`}></i>
                    <span className="tipo-dispositivo ms-2">
                        {props.unidadeDispositivo.entity_id.includes('light')
                            ? 'Iluminação'
                            : 'Dispositivo'}
                    </span>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-evenly buttons-action-card">
                {renderButtons()}
            </div>
        </div>
    );
}
