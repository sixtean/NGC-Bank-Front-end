import axios from "axios";

export interface Notificacao {
    id: string;
    titulo: string;
    mensagem: string;
    lida: boolean;
    criadaEm: string;
}

export interface DashboardData {
    nome: string;
    verificado: boolean;
    notificacoes: Notificacao[];
}

export async function fetchDashboardData(token: string): Promise<DashboardData> {
    const response = await axios.post(
        'http://localhost:5000/screens/Dashboard',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}

