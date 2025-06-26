import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { ProjectType } from "@/@types/admin/project-types";

type GetProjectTypesByOpportunityResponse =
  | HTTPSuccessResponse<ProjectType[]>
  | HTTPErrorResponse;

/**
 * @description Busca tipos de projeto por ID da oportunidade
 * @param opportunityId - ID da oportunidade
 * @returns Resposta da API com os tipos de projeto
 */
export async function getProjectTypesByOpportunity(
  opportunityId: string
): Promise<GetProjectTypesByOpportunityResponse> {
  try {
    const response = await api.get<HTTPSuccessResponse<ProjectType[]>>(
      `/project-types/${opportunityId}`
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
