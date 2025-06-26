import { ProjectGeneralInfoRequest } from "@/@schemas/project";
import { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

type UpdateProjectGeneralInfoResponse =
	| HTTPSuccessResponse<null>
	| HTTPErrorResponse;

/**
 * Atualiza as informações gerais de um projeto
 * @param projectId - ID do projeto
 * @param request - Dados das informações gerais do projeto
 * @returns Resposta da API
 */
export async function updateProjectGeneralInfo(
	projectId: string,
	request: ProjectGeneralInfoRequest
): Promise<UpdateProjectGeneralInfoResponse> {
	try {
		const response = await api.patch<HTTPSuccessResponse<null>>(
			`/projects/${projectId}/general-info`,
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
