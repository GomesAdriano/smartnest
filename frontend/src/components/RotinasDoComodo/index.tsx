import { Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import './index.css';
import {
    IRotina,
    useAddRotinaMutation,
    useGetRotinasComodoQuery,
    useUpdateNomeRotinaMutation,
} from '../../services/rotina.service';
import UnidadeRotina from '../UnidadeRotina';
import ModalDispositivos from '../ModalDispositivos';
import { useGetUnidadeComodoQuery } from '../../services/comodo.service';
import UnidadeAutomatizacao from '../UnidadeAutomacao';

interface RotinasDoComodoProps {
    comodoId: string;
}

export default function RotinasDoComodo(props: RotinasDoComodoProps) {
    const [nomeRotina, SetNomeRotina] = useState<string>('');
    const [isConfig, SetIsConfig] = useState<boolean>(false);
    const [rotinaEdicao, SetRotinaEdicao] = useState<IRotina>();
    const [modalShow, SetModalShow] = useState<boolean>(false);
    const [addRotina, { isLoading: isSaving }] = useAddRotinaMutation();
    const [updateNomeRotina, { isLoading: isUpdating }] = useUpdateNomeRotinaMutation();
    const { data: rotinas, isLoading: isFecthing } = useGetRotinasComodoQuery(props.comodoId);
    const {
        data: comodoAtual,
        isLoading: isComodoLoading,
        refetch: atualizarComodo,
    } = useGetUnidadeComodoQuery(props.comodoId);

    function alternarConfiguracao(isConfig: boolean, rotina: IRotina) {
        SetIsConfig(isConfig);
        SetRotinaEdicao(rotina);
        SetNomeRotina(rotina.descricao);
    }

    function criarAtualizarRotina() {
        if (!isConfig) {
            addRotina({ descricao: nomeRotina, comodoId: props.comodoId! }).then(() => {
                atualizarComodo();
            });
            SetNomeRotina('');
        } else {
            updateNomeRotina({ id: rotinaEdicao!.id, body: { descricao: nomeRotina } });
            SetNomeRotina('');
            SetIsConfig(false);
        }
    }

    function ListaRotinas() {
        if (!rotinas) return null;
        return (
            <div className="mt-3">
                {rotinas.length > 0
                    ? rotinas.map((rotina, index) => {
                          return (
                              <div key={index}>
                                  <UnidadeRotina
                                      rotina={rotina}
                                      setarConfig={alternarConfiguracao}
                                  />
                              </div>
                          );
                      })
                    : null}
            </div>
        );
    }

    return (
        <div>
            <h4>
                {isConfig ? (
                    <>
                        <i
                            className="bi bi-chevron-left fs-5"
                            role="button"
                            onClick={() => {
                                SetIsConfig(false);
                                SetNomeRotina('');
                            }}
                        ></i>
                        {' Atualizar rotina'}
                    </>
                ) : (
                    'Rotinas'
                )}
            </h4>{' '}
            {isSaving || isFecthing || isUpdating || isComodoLoading ? (
                <Spinner animation="border" size="sm" variant="secondary" />
            ) : null}
            {false ? (
                ''
            ) : (
                <>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>{isConfig ? 'Descricao' : 'Nova Rotina:'}</Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    type="text"
                                    placeholder="Nome da nova rotina"
                                    value={nomeRotina}
                                    onChange={(e) => SetNomeRotina(e.target.value)}
                                />
                                <div
                                    role="button"
                                    className="salve-6 nt-3 ms-2"
                                    onClick={() => {
                                        criarAtualizarRotina();
                                    }}
                                >
                                    Salvar
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                    {isConfig && comodoAtual !== undefined ? (
                        <div>
                            <p>Defina os estados dos dispositivos quando a rotina for ativada:</p>
                            {rotinaEdicao && !isComodoLoading ? (
                                comodoAtual.rotina
                                    .find((rotina) => rotina.id === rotinaEdicao.id)!
                                    .automatizacao.map((automatizacao, index) => {
                                        return (
                                            <div className="mb-2" key={index}>
                                                <UnidadeAutomatizacao
                                                    atualizarLista={atualizarComodo}
                                                    unidadeDispositivo={
                                                        automatizacao.unidadeDispositivo
                                                    }
                                                    idAutomatizacao={automatizacao.id}
                                                />
                                            </div>
                                        );
                                    })
                            ) : (
                                <></>
                            )}
                            <button
                                className="button-add w-100 h-25 nt-3 bg-secondary-subtle"
                                onClick={() => SetModalShow(true)}
                            >
                                <span className="icon-add fs-4">+</span>
                            </button>
                            <ModalDispositivos
                                idparaadicao={rotinaEdicao!.id}
                                carregando={isUpdating}
                                listadisp={comodoAtual!.unidadeDispositivo.filter((unidade) => {
                                    return !comodoAtual.rotina
                                        .find((rotina) => rotina.id === rotinaEdicao!.id)!
                                        .automatizacao.some((automatizacao) => {
                                            return (
                                                automatizacao.unidadeDispositivo.id === unidade.id
                                            );
                                        });
                                })}
                                onClose={() => SetModalShow(false)}
                                onHide={() => {
                                    SetModalShow(false);
                                    atualizarComodo();
                                }}
                                aftercall={atualizarComodo}
                                show={modalShow}
                                componente="comodoRotina"
                            />
                        </div>
                    ) : (
                        <ListaRotinas />
                    )}
                </>
            )}
        </div>
    );
}
