import type {
	HTTPErrorResponse,
	HTTPSuccessResponse,
} from "@/@types/http/http";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

type SignInRequestBody = {
	email: string;
	password: string;
};

type SignInResponseBody = {
	accessToken: string;
};

type SignInResponse =
	| HTTPSuccessResponse<SignInResponseBody>
	| HTTPErrorResponse;

/**
 * @description Realiza o login do usuário
 * @param data Dados do login
 * @returns Resposta da API
 */
export async function signIn(data: SignInRequestBody): Promise<SignInResponse> {
	try {
		const response = await api.post<SignInResponse>("/auth/sign-in", data);

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
