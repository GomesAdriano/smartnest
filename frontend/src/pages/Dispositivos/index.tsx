import './index.css';
import CaixaCadastro from '../../components/CaixaCadastro';
import UnidadeDispositivo from '../../components/UnidadeDispositivo';
import { useEffect, useState } from 'react';
import {
    IUnidadeDispositivo,
    useGetUnidadesDispositivoQuery,
} from '../../services/unidade-dispositivo.service';
import { useGetHADispositivosQuery } from '../../services/home.assistant.service';
import UnidadeIntegrado from '../../components/UnidadeIntegrado';

export default function Dispositivo() {
    const [isCreate, SetIsCreate] = useState(true);
    const [idParaEdicao, SetIdParaEdicao] = useState<IUnidadeDispositivo>();
    const {
        data: dispositivosHA,
        isLoading: dispLoading,
        refetch: refetchIntergracoes,
    } = useGetHADispositivosQuery();
    const {
        data: unidadesList,
        isLoading,
        refetch: refetchUnidades,
    } = useGetUnidadesDispositivoQuery();

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetchIntergracoes();
            refetchUnidades();
        }, 90000);
        return () => clearInterval(intervalId);
    }, []);

    function alternarCadastro(isCreate: boolean) {
        SetIsCreate(isCreate);
    }

    function alternarCriacaoEdicao(isCreate: boolean, unidade: IUnidadeDispositivo) {
        SetIsCreate(isCreate);
        SetIdParaEdicao(unidade);
    }

    function UnidadesList() {
        if (isLoading) return <div>Loading</div>;

        if (!unidadesList) return <div>Sem unidades cadastradas no momento :/ </div>;

        return (
            <div className="dispositivos">
                {unidadesList.map((un, index) => (
                    <UnidadeDispositivo
                        componente="dispositivo"
                        setCadastro={alternarCadastro}
                        alternarCriacaoEdicao={alternarCriacaoEdicao}
                        unidadeDispositivo={un}
                        key={index}
                    />
                ))}
                {dispositivosHA
                    ?.filter((un) => un.entity_id.includes('light'))
                    .map((un, index) => {
                        return (
                            <UnidadeIntegrado
                                key={index}
                                componente="dispositivo"
                                unidadeDispositivo={un}
                                atualizar={refetchIntergracoes}
                                atualizando={dispLoading}
                            />
                        );
                    })}
            </div>
        );
    }

    return (
        <>
            <div className="conteudo-principal">
                <h3>Dispositivos</h3>
                <div className="area-dispositivos">
                    <div className="formulario">
                        <CaixaCadastro
                            setCadastro={alternarCadastro}
                            isCreate={isCreate}
                            unidade={idParaEdicao!}
                        />
                    </div>
                    <UnidadesList />
                </div>
            </div>
        </>
    );
}
