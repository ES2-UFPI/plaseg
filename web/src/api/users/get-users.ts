import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { User } from "@/@types/auth/user";

export type GetUsersResponse = HTTPSuccessResponse<User[]> | HTTPErrorResponse;

/**
 * @description Busca todos os usuários de municipalidade
 * @returns Resposta da API com lista de usuários
 */
export async function getUsers(): Promise<GetUsersResponse> {
	try {
		const response = await api.get<HTTPSuccessResponse<User[]>>(
			"/municipality/users"
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
