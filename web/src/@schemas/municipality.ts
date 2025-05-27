import { z } from "zod";

export const municipalitySchema = z.object({
	name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	guardInitialDate: z.date(),
	guardCount: z.number(),
	trafficInitialDate: z.date(),
	trafficCount: z.number(),
	federativeUnit: z.string().min(2, "Digite uma UF válida"),
	unitType: z.string(),
});

export const qualifiedStaffSchema = z.object({
	name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	sector: z.string(),
	education: z.string(),
	experience: z.string(),
	employmentType: z.string(),
	isResponsible: z.boolean(),
	document: z.string(),
});

export const projectPartnershipSchema = z.object({
	term: z.string(),
	agency: z.string(),
	objective: z.string(),
	status: z.string(),
});

export const allocationDepartmentSchema = z.object({
	description: z.string(),
	address: z.string(),
});

export const managementSchema = z.object({
	initialDate: z.date(),
	endDate: z.date(),
	managerName: z.string(),
	managerCpf: z.string(),
	managerEmail: z.string().email(),
	managerAddress: z.string(),
	managerPhone: z.string(),
	adminManagerName: z.string(),
	adminManagerCpf: z.string(),
	adminManagerEmail: z.string().email(),
	adminManagerAddress: z.string(),
	adminManagerPhone: z.string(),
	legislationName: z.string(),
	legislationCpf: z.string(),
	legislationEmail: z.string().email(),
	legislationAddress: z.string(),
	legislationPhone: z.string(),
});

export const maintenanceContractSchema = z.object({
	description: z.string(),
	attachment: z.string(),
});

export type municipalitySchema = z.infer<typeof municipalitySchema>;
export type qualifiedStaffSchema = z.infer<typeof qualifiedStaffSchema>;
