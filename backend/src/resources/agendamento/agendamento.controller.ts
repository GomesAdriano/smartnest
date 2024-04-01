import { getDay, addMinutes, startOfHour, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import nodeSchedule from 'node-schedule';
import { getRotinas } from './agendamento.service';
import { playRotina } from '../rotina/rotina.service';
import { RotinaDto } from './agendamento.types';

const getData = () => {
    return utcToZonedTime(new Date(), 'America/Manaus');
};

const getDiaDaSemanaNumero = () => {
    return getDay(getData());
};

const getDiaDaSemana = () => {
    const diaDaSemanaNumero = getDiaDaSemanaNumero();
    const diaDaSemanaNome = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    return diaDaSemanaNome[diaDaSemanaNumero];
};

const getHorario = () => {
    const horarioAtual = getData();
    const minutosAtuais = horarioAtual.getMinutes();
    const minutosArredondados = minutosAtuais + (5 - (minutosAtuais % 5));
    return addMinutes(startOfHour(horarioAtual), minutosArredondados);
};

const getAgendamentos = async (diaDaSemana: string, horario: string) => {
    try {
        return await getRotinas(diaDaSemana, horario);
    } catch (error) {
        console.log('Erro ao buscar agendamentos:', error);
        return [];
    }
};

const playRotinas = async (agendamentos: RotinaDto[]) => {
    const automatizacoes = agendamentos.flatMap((rotina) =>
        rotina.automatizacao.map((disp) => ({
            unidadeDispositivoId: disp.unidadeDispositivoId,
            status: disp.status,
        })),
    );

    try {
        await playRotina(automatizacoes);
        console.log('Rotinas Executadas');
    } catch (error) {
        console.log('Erro ao executar rotinas:', error);
    }
};

const serviceAgendamentos = () => {
    const diaDaSemana = getDiaDaSemana();
    const horario = format(getHorario(), 'HH:mm');

    const rule = new nodeSchedule.RecurrenceRule();
    rule.dayOfWeek = getDiaDaSemanaNumero();
    rule.hour = getHorario().getHours();
    rule.minute = getHorario().getMinutes();
    rule.tz = 'America/Manaus';

    const job = nodeSchedule.scheduleJob(rule, async () => {
        try {
            const agendamentos = await getAgendamentos(diaDaSemana, horario);
            if (agendamentos.length > 0) await playRotinas(agendamentos);
            else console.log('Nenhum agendamento encontrado.');
        } catch (error) {
            console.log('Erro durante execução do job:', error);
        }

        const tempoDeEspera = 60 * 1000;
        setTimeout(serviceAgendamentos, tempoDeEspera);
    });
    console.log(job.nextInvocation());
};

export default { serviceAgendamentos };
