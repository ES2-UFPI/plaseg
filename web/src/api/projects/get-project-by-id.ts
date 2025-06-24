import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { Project } from "@/@schemas/project";

type GetProjectByIdResponse = HTTPSuccessResponse<Project> | HTTPErrorResponse;

/**
 * @description Busca um projeto por ID
 * @param id - ID do projeto
 * @returns Resposta da API
 */
export async function getProjectById(
	id: string
): Promise<GetProjectByIdResponse> {
	try {
		const response = await api.get<HTTPSuccessResponse<Project>>(
			`/projects/${id}`
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
