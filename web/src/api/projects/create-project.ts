import { CreateProjectRequest } from "@/@schemas/project";
import { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

type CreateProjectResponseBody = {
	projectId: string;
};

type CreateProjectResponse =
	| HTTPSuccessResponse<CreateProjectResponseBody>
	| HTTPErrorResponse;

/**
 * Cria um novo projeto
 * @param request - Dados do projeto
 * @returns Resposta da API
 */
export async function createProject(
	request: CreateProjectRequest
): Promise<CreateProjectResponse> {
	try {
		const response = await api.post<
			HTTPSuccessResponse<CreateProjectResponseBody>
		>("/projects", request);

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
