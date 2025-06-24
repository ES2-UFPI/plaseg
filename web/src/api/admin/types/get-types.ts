import type { Type, TypeGroup } from "@/@types/admin/type";
import type {
	HTTPErrorResponse,
	HTTPSuccessResponse,
} from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

type GetTypesRequest = {
	group?: TypeGroup;
	parentId?: string;
};

type GetTypesResponse = HTTPSuccessResponse<Type[]> | HTTPErrorResponse;

/**
 * @description Busca todos os tipos
 * @param request Parâmetros da requisição
 * @returns Resposta da API
 */
export async function getTypes(
	request: GetTypesRequest
): Promise<GetTypesResponse> {
	try {
		const response = await api.get<HTTPSuccessResponse<Type[]>>("/types", {
			params: request,
		});

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
