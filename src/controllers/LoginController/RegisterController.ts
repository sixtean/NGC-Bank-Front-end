import { registerService } from "../../services/loginServices/registerService";

export async function registerController(nome: string, email: string, senha: string) {
    return await registerService(nome, email, senha);
};