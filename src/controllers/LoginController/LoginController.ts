import { loginService } from "../../services/loginServices/loginService";

export async function loginController(email: string, senha: string) {
    if (!email || !senha) {
        throw new Error('Email e senha são obrigatórios.');
    }

    const response = await loginService(email, senha);
    return response;
};