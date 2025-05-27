import type {
	HTTPErrorResponse,
	HTTPSuccessResponse,
} from "@/@types/http/http";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

type GetProfileResponseBody = {
	id: string;
	name: string;
	email: string;
	role: string;
};

type GetProfileResponse =
	| HTTPSuccessResponse<GetProfileResponseBody>
	| HTTPErrorResponse;

/**
 * @description Busca o perfil do usuário
 * @returns Resposta da API
 */
export async function getProfile(): Promise<GetProfileResponse> {
	try {
		const response = await api.get<GetProfileResponse>("/auth/profile");

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
