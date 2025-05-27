import { Role } from "@prisma/client";

export const users = [
	{
		name: "Acme",
		phone: "11999999999",
		document: "12345678900",
		email: "admplaseg@plaseg.com",
		password: "TJIS123@",
		role: Role.ADMIN_MASTER,
	},
	{
		name: "Admin Support",
		email: "support@example.com",
		phone: "11988888888",
		document: "98765432100",
		password: "support123",
		role: Role.ADMIN,
	},
	{
		name: "Admin Finance",
		email: "finance@example.com",
		phone: "11977777777",
		document: "45678912300",
		password: "finance123",
		role: Role.ADMIN,
	},
	{
		name: "Admin Operations",
		email: "operations@example.com",
		phone: "11966666666",
		document: "78912345600",
		password: "operations123",
		role: Role.ADMIN,
	},
	{
		name: "Admin HR",
		email: "hr@example.com",
		phone: "11955555555",
		document: "32165498700",
		password: "hr123",
		role: Role.ADMIN,
	},
];
