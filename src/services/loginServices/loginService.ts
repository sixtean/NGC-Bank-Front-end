import axios from 'axios';

export async function loginService(email: string, senha: string) {
    try {
        const response = await axios.post('http://localhost:5000/user/login', {
            email,
            senha
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Erro no login.');
    }
}