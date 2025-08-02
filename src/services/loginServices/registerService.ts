import axios from 'axios';

export async function registerService(nome: string, email: string, senha: string) {
    try {
        const response = await axios.post("http://localhost:5000/user/register", {
            nome,
            email,
            senha
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Erro ao registrar.");
    }
};