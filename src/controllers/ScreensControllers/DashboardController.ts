import { fetchDashboardData, type DashboardData } from '../../services/screensService/DashboardService';

export async function DashboardController(): Promise<DashboardData | null> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return null;
    }

    const data = await fetchDashboardData(token);
    return data;
  } catch (error) {
    console.error('Erro ao buscar dashboard:', error);
    return null;
  }
}