import { AxiosError } from "axios";
import { Administrator } from "@/@types/admin/administrator";
import { api } from "@/lib/axios";
import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http";

type GetAdministratorsResponse =
	| HTTPSuccessResponse<Administrator[]>
	| HTTPErrorResponse;

export async function getAdministrators(): Promise<GetAdministratorsResponse> {
	try {
		const response = await api.get<HTTPSuccessResponse<Administrator[]>>(
			"/admin"
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
