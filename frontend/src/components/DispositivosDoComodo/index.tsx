import { useEffect, useState } from 'react';
import UnidadeDispositivo from '../UnidadeDispositivo';
import { useGetUnidadesDispositivoQuery } from '../../services/unidade-dispositivo.service';
import { useGetUnidadeComodoQuery } from '../../services/comodo.service';
import ModalDispositivos from '../ModalDispositivos';

interface DispositivosDoComodoProps {
    comodoId: string | undefined;
}

export default function DispositivosDoComodo(props: DispositivosDoComodoProps) {
    const [modalShow, SetModalShow] = useState<boolean>(false);
    const {
        data: unidadesList,
        isLoading: isListLoading,
        refetch: atualizarLista,
    } = useGetUnidadesDispositivoQuery();
    const {
        data: comodoAtual,
        isLoading: isFecthing,
        refetch: atualizarComodo,
    } = useGetUnidadeComodoQuery(props.comodoId!);

    useEffect(() => {
        atualizarLista();
    }, [comodoAtual]);

    if (isFecthing) return <div>Loading</div>;

    return comodoAtual ? (
        <div>
            <h4>Dispositivos</h4>
            <button
                className="button-add w-100 h-25 nt-3 bg-secondary-subtle"
                onClick={() => SetModalShow(true)}
            >
                <span className="icon-add fs-4">+</span>
            </button>
            <div className="mt-3">Dispositivos desse cômodo</div>
            <div className="dispositivos">
                {comodoAtual.unidadeDispositivo.map((un, index) => (
                    <UnidadeDispositivo
                        unidadeDispositivo={un}
                        key={index}
                        componente="comodo"
                        atualizar={atualizarComodo}
                    />
                ))}
            </div>
            <ModalDispositivos
                listadisp={unidadesList ? unidadesList.filter((un) => !un.comodo) : []}
                idparaadicao={comodoAtual.id}
                show={modalShow}
                onClose={() => SetModalShow(false)}
                carregando={isListLoading}
                componente="comodoDispositivo"
                onHide={() => SetModalShow(false)}
                aftercall={atualizarComodo}
            />
        </div>
    ) : null;
}
