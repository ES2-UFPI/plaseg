import type {
	HTTPErrorResponse,
	HTTPSuccessResponse,
} from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

interface SignUpRequestBody {
	name: string;
	email: string;
	password: string;
}

type SignUpResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

/**
 * @description Realiza o cadastro do usuário
 * @param body Dados do cadastro
 * @returns Resposta da API
 */
export async function signUp(body: SignUpRequestBody): Promise<SignUpResponse> {
	try {
		const response = await api.post<SignUpResponse>("/auth/sign-up", body);

		return response.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response?.data) {
			return error.response.data;
		}

		return {
			success: false,
			errors: ["Erro desconhecido"],
			data: null,
		};
	}
}
