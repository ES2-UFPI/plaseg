import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { Project } from "@/@types/project/project";

type GetProjectsResponse = HTTPSuccessResponse<Project[]> | HTTPErrorResponse;

/**
 * @description Busca todos os projetos
 * @param request - Parâmetros da requisição
 * @returns Resposta da API
 */
export async function getProjects(): Promise<GetProjectsResponse> {
	try {
		const response = await api.get<HTTPSuccessResponse<Project[]>>("/projects");

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
