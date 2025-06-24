import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { CreateSpecificProductRequest } from "@/@schemas/specific-product";

type CreateSpecificProductResponse =
	| HTTPSuccessResponse<null>
	| HTTPErrorResponse;

/**
 * @description Adiciona um produto específico
 * @param request
 * @returns
 */
export async function createSpecificProduct(
	request: CreateSpecificProductRequest
): Promise<CreateSpecificProductResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<null>>(
			"/specific-products",
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
