import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { IRotina, useUpdateHorarioRotinaMutation } from '../../services/rotina.service';
import dayjs, { Dayjs } from 'dayjs';
import { SetStateAction, useEffect, useState } from 'react';
import {
    BaseQueryFn,
    QueryActionCreatorResult,
    QueryDefinition,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    FetchArgs,
} from '@reduxjs/toolkit/query';

interface pickerProps {
    rotina: IRotina;
    atualizarRotina: () => QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
            'rotina',
            IRotina,
            'rotinaApi'
        >
    >;
}

export default function TimePickerView(props: pickerProps) {
    const [updateHorario] = useUpdateHorarioRotinaMutation();
    const [value, SetValue] = useState<Dayjs | null>(null);
    const [horas, SetHoras] = useState<string>('00');
    const [minutos, SetMinutos] = useState<string>('00');

    useEffect(() => {
        SetValue(
            dayjs()
                .set(
                    'hour',
                    parseInt(props.rotina.horario ? props.rotina.horario.split(':')[0] : '00'),
                )
                .set(
                    'minute',
                    parseInt(props.rotina.horario ? props.rotina.horario.split(':')[1] : '00'),
                ),
        );
    }, [props]);

    function atualizar() {
        updateHorario({
            id: props.rotina.id,
            body: {
                horario: `${horas.toString().padStart(2, '0')}:${minutos}`,
            },
        });
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker
                    closeOnSelect={false}
                    value={value}
                    label="Horário"
                    onChange={(newValue: SetStateAction<Dayjs | null>) => {
                        SetHoras((newValue as Dayjs).hour() + '');
                        SetMinutos((newValue as Dayjs).minute() + '');
                    }}
                    onClose={() => {
                        atualizar();
                    }}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                    }}
                    ampm={false}
                    minutesStep={5}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
