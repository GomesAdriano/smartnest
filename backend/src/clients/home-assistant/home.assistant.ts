import { Request, Response } from 'express';
import { instance } from './axios.client';

const listarUnidadesDispositivo = async (req: Request, res: Response) => {
    try {
        const response = await instance.http.get(`http://${URL_HOME_ASSISTANT}/api/states`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(error);
    }
};

const atualizarStatusUnidadeIntegrado = async (req: Request, res: Response) => {
    //Id da unidade de dispositivo
    const { entity_id } = req.params;
    const { state } = req.body;
    const domain = entity_id.includes('light') ? 'light' : 'zone';
    try {
        await instance.http.post(`http://${URL_HOME_ASSISTANT}/api/services/${domain}/turn_${state}`, {
            entity_id: entity_id,
        });
        const interval: NodeJS.Timeout = setInterval(() => {
            res.status(200).send({
                msg: 'Status do dispositivo atualizado com sucesso.',
            });
            clearInterval(interval);
        }, 2000);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export default {
    listarUnidadesDispositivo,
    atualizarStatusUnidadeIntegrado,
};
