import { refreshTokenService } from "../../services/auth/refreshTokenService";

export async function refreshTokenController(): Promise<void> {
  try {
    await refreshTokenService();
    console.log('🔁 Token atualizado com sucesso');

    const minutos = 55;
    const milissegundos = minutos * 60 * 1000;

    setTimeout(() => {
      refreshTokenController();
    }, milissegundos);

  } catch (error) {
    console.error('❌ Falha ao atualizar token:', error);
  }
}
