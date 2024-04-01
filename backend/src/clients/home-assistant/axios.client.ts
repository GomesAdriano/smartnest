import axios, { AxiosInstance } from 'axios';

export const head: Readonly<Record<string, string>> = {
    'Content-Type': 'application/json',
    Authorization: process.env.HATOKEN!,
};

class homeClient {
    private instance: AxiosInstance | null = null;

    public get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }

    initHttp() {
        const apiUrl = process.env.HOMEASSISTANT_URL!;

        const homeClient = axios.create({
            baseURL: apiUrl,
            headers: head,
        });

        homeClient.interceptors.response.use(
            function (response) {
                return response;
            },

            function (error) {
                console.log('Erro ao se comunicar com a API do homeassistant: ', error);
            },
        );
        this.instance = homeClient;
        return homeClient;
    }
}

export const instance = new homeClient();
