import dotenv from 'dotenv';
dotenv.config();

export const api = {
    name: 'API-SMARTNEST',
    defaultPort: process.env.PORT ?? 3333,
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3366',
};
