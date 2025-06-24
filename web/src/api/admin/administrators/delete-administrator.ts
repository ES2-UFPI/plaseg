import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";

type DeleteAdministratorResponse =
	| HTTPSuccessResponse<null>
	| HTTPErrorResponse;

export async function deleteAdministrator(
	id: string
): Promise<DeleteAdministratorResponse> {
	try {
		const response = await api.delete<HTTPSuccessResponse<null>>(
			`/administrators/${id}`
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
