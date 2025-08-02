// src/services/auth/refreshTokenService.ts
import axios from "axios";

export async function refreshTokenService(): Promise<string> {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('Token não encontrado no localStorage');

  const response = await axios.post('http://localhost:5000/util/refresh-token', {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const newToken = response.data.token;
  localStorage.setItem('token', newToken);
  return newToken;
}
