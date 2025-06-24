import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { RequiredDocument } from "@/@types/admin/required-document";

type GetRequiredDocumentsResponse =
	| HTTPSuccessResponse<RequiredDocument[]>
	| HTTPErrorResponse;

export async function getRequiredDocuments(): Promise<GetRequiredDocumentsResponse> {
	try {
		const response = await api.get<HTTPSuccessResponse<RequiredDocument[]>>(
			"/required-documents"
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
