import { TypeGroup } from "@prisma/client";

export const types = () => {
	return [
		{
			description: "Armas de Fogo",
			group: TypeGroup.CATEGORY,
			children: {
				create: [
					{
						description: "Pistolas",
						group: TypeGroup.CATEGORY,
						children: {
							create: [
								{
									description: "Pistola Glock 9mm",
									group: TypeGroup.CATEGORY,
								},
								{
									description: "Pistola Beretta 92",
									group: TypeGroup.CATEGORY,
								},
							],
						},
					},
					{
						description: "Fuzis",
						group: TypeGroup.CATEGORY,
						children: {
							create: [
								{
									description: "Fuzil AR-15",
									group: TypeGroup.CATEGORY,
								},
								{
									description: "Fuzil AK-47",
									group: TypeGroup.CATEGORY,
								},
							],
						},
					},
					{
						description: "Espingardas",
						group: TypeGroup.CATEGORY,
						children: {
							create: [
								{
									description: "Espingarda Pump Calibre 12",
									group: TypeGroup.CATEGORY,
								},
							],
						},
					},
					{
						description: "Submetralhadoras",
						group: TypeGroup.CATEGORY,
						children: {
							create: [
								{
									description: "Submetralhadora MP5",
									group: TypeGroup.CATEGORY,
								},
							],
						},
					},
					{
						description: "Revólveres",
						group: TypeGroup.CATEGORY,
					},
					{
						description: "Metralhadoras",
						group: TypeGroup.CATEGORY,
					},
				],
			},
		},
		{
			description: "Chamada Pública",
			group: TypeGroup.OPPORTUNITY,
		},
	];
};
