import { z } from "zod";

export const createQualifiedStaffBodySchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	sector: z.string().min(1, "Setor é obrigatório"),
	education: z.string().min(1, "Formação é obrigatória"),
	experience: z.string().min(1, "Experiência é obrigatória"),
	employmentType: z.enum(["CLT", "PJ", "OTHERS"], {
		errorMap: () => ({ message: "Tipo de vínculo inválido" }),
	}),
	document: z.string().refine(
		(val) => {
			const length = val.length;
			return length === 11 || length === 14;
		},
		{ message: "Documento Inválido" }
	),
	isResponsible: z.boolean({
		required_error: "Indicação de responsável é obrigatória",
	}),
});

export const createProjectPartnershipBodySchema = z.object({
	term: z.string().min(1, "Termo é obrigatório"),
	agency: z.string().min(1, "Órgão/Agência é obrigatório"),
	objective: z.string().min(1, "Objetivo é obrigatório"),
	status: z.string().min(1, "Status é obrigatório"),
});

export const createAllocationDepartmentBodySchema = z.object({
	description: z.string().min(1, "Descrição é obrigatória"),
	address: z.string().min(1, "Endereço é obrigatório"),
});

export const createManagementBodySchema = z.object({
	initialDate: z.coerce.date({
		required_error: "Data inicial é obrigatória",
		invalid_type_error: "Data inicial inválida",
	}),
	endDate: z.coerce.date({
		required_error: "Data final é obrigatória",
		invalid_type_error: "Data final inválida",
	}),
	managerName: z.string().min(1, "Nome do gerente é obrigatório"),
	managerCpf: z
		.string()
		.refine((val) => val.length === 11, { message: "CPF do gerente inválido" }),
	managerEmail: z.string().email("Email do gerente inválido"),
	managerAddress: z.string().min(1, "Endereço do gerente é obrigatório"),
	managerPhone: z
		.string()
		.refine((val) => val.length === 10 || val.length === 11, {
			message: "Telefone do gerente inválido",
		}),
	adminManagerName: z
		.string()
		.min(1, "Nome do gerente administrativo é obrigatório"),
	adminManagerCpf: z.string().refine((val) => val.length === 11, {
		message: "CPF do gerente administrativo inválido",
	}),
	adminManagerEmail: z
		.string()
		.email("Email do gerente administrativo inválido"),
	adminManagerAddress: z
		.string()
		.min(1, "Endereço do gerente administrativo é obrigatório"),
	adminManagerPhone: z
		.string()
		.refine((val) => val.length === 10 || val.length === 11, {
			message: "Telefone do gerente administrativo inválido",
		}),
	legislationName: z.string().min(1, "Nome da legislação é obrigatório"),
	legislationCpf: z.string().refine((val) => val.length === 11, {
		message: "CPF da legislação inválido",
	}),
	legislationEmail: z.string().email("Email da legislação inválido"),
	legislationAddress: z.string().min(1, "Endereço da legislação é obrigatório"),
	legislationPhone: z
		.string()
		.refine((val) => val.length === 10 || val.length === 11, {
			message: "Telefone da legislação inválido",
		}),
});

export const createMaintenanceContractRequestBodySchema = z.object({
	description: z.string().min(1, "Descrição é obrigatória"),
	attachment: z.string().min(1, "Anexo é obrigatório"),
});

export const createMunicipalityRequestBodySchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	guardInitialDate: z.coerce.date({
		required_error: "Data inicial da guarda é obrigatória",
		invalid_type_error: "Data inicial da guarda inválida",
	}),
	guardCount: z
		.number()
		.int()
		.min(0, "Contagem da guarda deve ser um número inteiro não negativo"),
	trafficInitialDate: z.coerce.date({
		required_error: "Data inicial do trânsito é obrigatória",
		invalid_type_error: "Data inicial do trânsito inválida",
	}),
	trafficCount: z
		.number()
		.int()
		.min(0, "Contagem do trânsito deve ser um número inteiro não negativo"),
	federativeUnit: z.string().length(2, "UF deve ter 2 caracteres"),
	unitType: z.enum(["UF", "MUNICIPALITY"], {
		errorMap: () => ({ message: "Tipo de unidade inválido" }),
	}),
	qualifiedStaff: z.array(createQualifiedStaffBodySchema),
	projectsPartnerships: z.array(createProjectPartnershipBodySchema),
	allocationDepartments: z.array(createAllocationDepartmentBodySchema),
	managements: z.array(createManagementBodySchema),
	maintenanceContracts: z.array(createMaintenanceContractRequestBodySchema),
});
