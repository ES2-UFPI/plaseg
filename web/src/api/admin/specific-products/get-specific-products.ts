import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { SpecificProduct } from "@/@types/admin/specifc-product";

type GetSpecificProductsResponse =
	| HTTPSuccessResponse<{
			specificProducts: SpecificProduct[];
	  }>
	| HTTPErrorResponse;

/**
 * @description Busca todos os produtos específicos
 * @returns
 */
export async function getSpecificProducts(): Promise<GetSpecificProductsResponse> {
	try {
		const response = await api.get<
			HTTPSuccessResponse<{ specificProducts: SpecificProduct[] }>
		>("/specific-products");

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
