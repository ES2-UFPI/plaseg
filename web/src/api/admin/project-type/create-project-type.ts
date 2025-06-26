import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { ProjectType } from "@/@types/admin/project-types";
import { CreateProjectTypeRequest } from "@/@schemas/project-type";

type CreateProjectTypeResponse =
	| HTTPSuccessResponse<ProjectType>
	| HTTPErrorResponse;

/**
 * @description Adiciona uma oportunidade
 * @param request
 * @returns
 */
export async function createProjectType(
	request: CreateProjectTypeRequest
): Promise<CreateProjectTypeResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<ProjectType>>(
			"/project-types",
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
