import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";

type AllowUserResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

/**
 * @description Permite/aprova um usuário específico
 * @param userId - ID do usuário para aprovar
 * @returns Resposta da API
 */
export async function allowUser(userId: string): Promise<AllowUserResponse> {
	try {
		const response = await api.patch<HTTPSuccessResponse<null>>(
			`/municipality/users/${userId}`
		);

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
