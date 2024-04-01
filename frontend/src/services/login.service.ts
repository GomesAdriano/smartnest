import { instance } from '../utils/http';

export interface IUsuario {
    id?: string;
    nome?: string;
    email?: string;
}

export async function DoLoginUser(email: string, senha: string): Promise<IUsuario> {
    const result = await instance.http.put('/auth', { email, senha });

    if (result.status !== 201) throw Error();

    const user: IUsuario = {
        email: email,
    };

    return user;
}

export async function CreateUser(nome: string, email: string, senha: string) {
    const result = await instance.http.post('/auth', {
        nome,
        email,
        senha,
    });

    if (result.status !== 201) throw Error();
}

export async function Logout() {
    try {
        await instance.http.delete('/auth');
    } catch (error) {
        console.log(error);
    }
}
