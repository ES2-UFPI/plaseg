import type { CreateTypeRequest } from "@/@schemas/type";
import type {
	HTTPErrorResponse,
	HTTPSuccessResponse,
} from "@/@types/http/http";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

type CreateTypeResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

/**
 * @description Adiciona um tipo
 * @param request Dados do tipo
 * @returns Resposta da API
 */
export async function createType(
	request: CreateTypeRequest
): Promise<CreateTypeResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<null>>(
			"/types",
			request
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
