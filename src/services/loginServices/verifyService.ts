import axios from "axios";

export async function verifyService(codigo: string, token: string) {
    try {
        const response = await axios.post(
            'http://localhost:5000/user/verify',
            {codigo},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Erro ao verificar conta.');
    }
}