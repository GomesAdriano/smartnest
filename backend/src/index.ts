import dotenv from 'dotenv';
import { api } from './api-info';
import { Api } from './server';
import task from './resources/agendamento/agendamento.controller';

dotenv.config();

const server = new Api();

try {
    server.bootstrap().then(() => {
        console.info(`API SmartNest rodando na porta ${api.defaultPort}`);
        task.serviceAgendamentos();
    });
} catch (error) {
    console.error('Server failed to start.');
    console.error(error);
    process.exit(1);
}
