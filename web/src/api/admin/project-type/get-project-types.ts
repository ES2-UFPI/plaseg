import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { ProjectType } from "@/@types/admin/project-types";

type GetProjectTypesResponse =
  | HTTPSuccessResponse<ProjectType[]>
  | HTTPErrorResponse;

export async function getProjectTypes(): Promise<GetProjectTypesResponse> {
  try {
    const response =
      await api.get<HTTPSuccessResponse<ProjectType[]>>("/project-types");

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
