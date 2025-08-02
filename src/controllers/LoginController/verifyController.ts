import { verifyService } from "../../services/loginServices/verifyService";

export async function verifyController(codigo: string, token: string) {
    return await verifyService(codigo, token);
}