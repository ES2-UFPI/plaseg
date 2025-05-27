import { Decimal } from "@prisma/client/runtime/library";

export const specifcProducts = (baseProductId: string) => {
	return [
		{
			brand: "Glock",
			model: "G17 Gen5",
			description:
				"Pistola Glock 9mm, geração 5, acabamento preto, trilho para acessórios.",
			unitValue: new Decimal(1000.0),
			budget: new Decimal(1000.0),
			budgetValidity: new Date("2025-05-12T12:36:26.773Z"),
			warrantyMonths: 12,
			updatedAt: null,
			baseProductId: baseProductId,
		},
		{
			brand: "Glock",
			model: "G19 Gen4",
			description:
				"Pistola Glock 9mm, geração 4, compacta, ideal para porte velado.",
			unitValue: new Decimal(1100.0),
			budget: new Decimal(1100.0),
			budgetValidity: new Date("2025-06-01T10:00:00.000Z"),
			warrantyMonths: 24,
			updatedAt: null,
			baseProductId: baseProductId,
		},
		{
			brand: "Taurus",
			model: "TH9",
			description:
				"Pistola Taurus TH9, calibre 9mm, armação em polímero, trilho picatinny.",
			unitValue: new Decimal(950.0),
			budget: new Decimal(950.0),
			budgetValidity: new Date("2025-07-15T09:30:00.000Z"),
			warrantyMonths: 18,
			updatedAt: null,
			baseProductId: baseProductId,
		},
		{
			brand: "Beretta",
			model: "APX",
			description:
				"Pistola Beretta APX, calibre 9mm, design modular, trilho para acessórios.",
			unitValue: new Decimal(1200.0),
			budget: new Decimal(1200.0),
			budgetValidity: new Date("2025-08-20T14:00:00.000Z"),
			warrantyMonths: 12,
			updatedAt: null,
			baseProductId: baseProductId,
		},
		{
			brand: "Sig Sauer",
			model: "P320",
			description:
				"Pistola Sig Sauer P320, calibre 9mm, modular, trilho M1913.",
			unitValue: new Decimal(1300.0),
			budget: new Decimal(1300.0),
			budgetValidity: new Date("2025-09-10T16:45:00.000Z"),
			warrantyMonths: 24,
			updatedAt: null,
			baseProductId: baseProductId,
		},
	];
};
