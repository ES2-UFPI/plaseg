import { z } from "zod";

const qualifiedStaffSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	sector: z.string().min(1, "Setor é obrigatório"),
	education: z.string().min(1, "Escolaridade é obrigatória"),
	experience: z.string().min(1, "Experiência é obrigatória"),
	employmentType: z.enum(["CLT", "ESTATUTARIO", "TERCEIRIZADO", "ESTAGIARIO"]),
	document: z.string().min(1, "Documento é obrigatório"),
	isResponsible: z.boolean(),
});

const projectPartnershipSchema = z.object({
	term: z.string().min(1, "Termo é obrigatório"),
	agency: z.string().min(1, "Órgão é obrigatório"),
	objective: z.string().min(1, "Objetivo é obrigatório"),
	status: z.string().min(1, "Status é obrigatório"),
});

const allocationDepartmentSchema = z.object({
	description: z.string().min(1, "Descrição é obrigatória"),
	address: z.string().min(1, "Endereço é obrigatório"),
});

const managementSchema = z.object({
	initialDate: z.coerce.date({ required_error: "Data inicial é obrigatória" }),
	endDate: z.coerce.date({ required_error: "Data final é obrigatória" }),
	managerName: z.string().min(1, "Nome do gestor é obrigatório"),
	managerCpf: z.string().min(11, "CPF do gestor é obrigatório"),
	managerEmail: z.string().email("Email do gestor inválido"),
	managerAddress: z.string().min(1, "Endereço do gestor é obrigatório"),
	managerPhone: z.string().min(1, "Telefone do gestor é obrigatório"),
	adminManagerName: z
		.string()
		.min(1, "Nome do gestor administrativo é obrigatório"),
	adminManagerCpf: z
		.string()
		.min(11, "CPF do gestor administrativo é obrigatório"),
	adminManagerEmail: z
		.string()
		.email("Email do gestor administrativo inválido"),
	adminManagerAddress: z
		.string()
		.min(1, "Endereço do gestor administrativo é obrigatório"),
	adminManagerPhone: z
		.string()
		.min(1, "Telefone do gestor administrativo é obrigatório"),
	legislationName: z
		.string()
		.min(1, "Nome do responsável pela legislação é obrigatório"),
	legislationCpf: z
		.string()
		.min(11, "CPF do responsável pela legislação é obrigatório"),
	legislationEmail: z
		.string()
		.email("Email do responsável pela legislação inválido"),
	legislationAddress: z
		.string()
		.min(1, "Endereço do responsável pela legislação é obrigatório"),
	legislationPhone: z
		.string()
		.min(1, "Telefone do responsável pela legislação é obrigatório"),
});

const maintenanceContractSchema = z.object({
	description: z.string().min(1, "Descrição é obrigatória"),
	attachment: z.string().min(1, "Anexo é obrigatório"),
});

export const municipalityFormSchema = z.object({
	name: z.string().min(1, "Nome do município é obrigatório"),
	guardInitialDate: z.coerce.date({
		required_error: "Data inicial da guarda é obrigatória",
	}),
	guardCount: z.coerce
		.number({
			required_error: "Quantidade de guardas é obrigatória",
		})
		.positive({
			message: "Quantidade de guardas deve ser maior ou igual a 0",
		}),
	trafficInitialDate: z.coerce.date({
		required_error: "Data inicial do trânsito é obrigatória",
	}),
	trafficCount: z.coerce
		.number({
			required_error: "Quantidade de registros de trânsito é obrigatória",
		})
		.positive({
			message:
				"Quantidade de registros de trânsito deve ser maior ou igual a 0",
		}),
	federativeUnit: z.string().min(2, "Unidade federativa é obrigatória"),
	unitType: z.enum(["ESTADO", "MUNICIPIO"]),
	qualifiedStaff: z
		.array(qualifiedStaffSchema)
		.min(1, "Pelo menos um membro da equipe é obrigatório"),
	projectsPartnerships: z.array(projectPartnershipSchema),
	allocationDepartments: z.array(allocationDepartmentSchema),
	managements: z
		.array(managementSchema)
		.min(1, "Pelo menos um período de gestão é obrigatório"),
	maintenanceContracts: z.array(maintenanceContractSchema),
});

export type CreateMunicipalityRequest = z.infer<typeof municipalityFormSchema>;
