export interface Opportunity {
	id: string;
	title: string;
	organization: string;
	objectives: string;
	minValue: string;
	maxValue: string;
	registrationPeriod: string;
	badgeText: string;
	slug: string;
}

export const opportunities: Opportunity[] = [
	{
		id: "550e8400-e29b-41d4-a716-446655440000",
		title: "Fomento à Segurança Pública Municipal",
		organization: "Secretaria Nacional de Segurança Pública (SENASP)",
		objectives: "Capacitação da Guarda Municipal; Aquisição de Equipamentos.",
		minValue: "R$ 500.000,00",
		maxValue: "R$ 3.000.000,00",
		registrationPeriod: "01/03/2025 - 30/04/2025",
		badgeText: "Edital",
		slug: "fomento-a-seguranca-publica-municipal",
	},
	{
		id: "8d4e5f6a-2b1c-4d8e-9f7a-1c2d3e4f5a6b",
		title: "Segurança Digital em Saúde Pública",
		organization: "Ministério da Saúde",
		objectives:
			"Proteção de dados de pacientes; Treinamento contra ataques cibernéticos.",
		minValue: "R$ 300.000,00",
		maxValue: "R$ 2.000.000,00",
		registrationPeriod: "01/04/2025 - 30/06/2025",
		badgeText: "Chamada Pública",
		slug: "seguranca-digital-em-saude-publica",
	},
	{
		id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
		title: "Capacitação de Agentes de Segurança Escolar",
		organization: "Ministério da Educação (MEC)",
		objectives:
			"Treinamento de agentes para segurança em escolas; Instalação de câmeras de monitoramento.",
		minValue: "R$ 200.000,00",
		maxValue: "R$ 1.500.000,00",
		registrationPeriod: "15/03/2025 - 15/05/2025",
		badgeText: "Edital",
		slug: "capacitacao-de-agentes-de-seguranca-escolar",
	},
	{
		id: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
		title: "Segurança Hídrica em Comunidades",
		organization: "Ministério das Cidades",
		objectives:
			"Proteção de reservatórios contra vandalismo; Monitoramento de áreas de risco.",
		minValue: "R$ 1.000.000,00",
		maxValue: "R$ 5.000.000,00",
		registrationPeriod: "10/04/2025 - 10/06/2025",
		badgeText: "Chamada Pública",
		slug: "seguranca-hidrica-em-comunidades",
	},
	{
		id: "e7e014fd-8c3b-4e2e-8e1e-7e7f2d8b5e7f",
		title: "Segurança na Agricultura Familiar",
		organization: "Ministério da Agricultura",
		objectives:
			"Proteção de áreas rurais contra furtos; Capacitação em segurança comunitária.",
		minValue: "R$ 150.000,00",
		maxValue: "R$ 800.000,00",
		registrationPeriod: "20/03/2025 - 20/05/2025",
		badgeText: "Edital",
		slug: "seguranca-na-agricultura-familiar",
	},
	{
		id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
		title: "Segurança no Patrimônio Cultural",
		organization: "Ministério da Cultura",
		objectives: "Vigilância de bens tombados; Prevenção contra vandalismo.",
		minValue: "R$ 250.000,00",
		maxValue: "R$ 1.200.000,00",
		registrationPeriod: "05/04/2025 - 05/06/2025",
		badgeText: "Edital",
		slug: "seguranca-no-patrimonio-cultural",
	},
	{
		id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
		title: "Segurança na Mobilidade Urbana",
		organization: "Ministério do Desenvolvimento Regional",
		objectives:
			"Monitoramento de vias públicas; Prevenção de acidentes e crimes.",
		minValue: "R$ 800.000,00",
		maxValue: "R$ 4.000.000,00",
		registrationPeriod: "15/04/2025 - 15/07/2025",
		badgeText: "Chamada Pública",
		slug: "seguranca-na-mobilidade-urbana",
	},
	{
		id: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f",
		title: "Segurança em Tecnologia da Informação",
		organization: "Ministério da Ciência e Tecnologia",
		objectives:
			"Proteção de dados governamentais; Capacitação contra cyberataques.",
		minValue: "R$ 100.000,00",
		maxValue: "R$ 900.000,00",
		registrationPeriod: "10/03/2025 - 10/05/2025",
		badgeText: "Edital",
		slug: "seguranca-em-tecnologia-da-informacao",
	},
	{
		id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
		title: "Segurança Energética em Comunidades",
		organization: "Ministério de Minas e Energia",
		objectives:
			"Proteção de instalações elétricas; Prevenção de furtos de energia.",
		minValue: "R$ 400.000,00",
		maxValue: "R$ 2.500.000,00",
		registrationPeriod: "25/03/2025 - 25/06/2025",
		badgeText: "Chamada Pública",
		slug: "seguranca-energetica-em-comunidades",
	},
	{
		id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
		title: "Segurança na Gestão de Resíduos",
		organization: "Ministério do Meio Ambiente",
		objectives: "Controle de acesso a lixões; Prevenção de crimes ambientais.",
		minValue: "R$ 300.000,00",
		maxValue: "R$ 1.800.000,00",
		registrationPeriod: "01/05/2025 - 31/07/2025",
		badgeText: "Edital",
		slug: "seguranca-na-gestao-de-residuos",
	},
];
