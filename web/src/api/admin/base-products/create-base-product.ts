import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { CreateBaseProductRequest } from "@/@schemas/base-product";

type CreateBaseProductResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

/**
 * @description Adiciona um produto base
 * @param request
 * @returns
 */
export async function createBaseProduct(
	request: CreateBaseProductRequest
): Promise<CreateBaseProductResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<null>>(
			"/base-products",
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
