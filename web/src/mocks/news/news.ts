interface NewsItem {
	title: string;
	category: string;
	readTime: string;
	excerpt: string;
	imageUrl: string;
}

export const news: NewsItem[] = [
	{
		title: "Programa de Capacitação Digital para Professores Municipais",
		category: "10 de Janeiro de 2025",
		readTime: "4 minutos de leitura",
		excerpt:
			"A Secretaria de Educação anunciou novo programa de capacitação digital para treinar professores da rede municipal.",
		imageUrl: "/api/placeholder/400/250",
	},
	{
		title: "Inauguração do Centro de Inovação Tecnológica",
		category: "28 de Janeiro de 2025",
		readTime: "5 minutos de leitura",
		excerpt:
			"A prefeitura inaugurou hoje o primeiro Centro de Inovação Tecnológica da região.",
		imageUrl: "/api/placeholder/400/250",
	},
	{
		title: "Nova Política de Sustentabilidade Ambiental Municipal",
		category: "15 de Fevereiro de 2025",
		readTime: "3 minutos de leitura",
		excerpt:
			"O Conselho Municipal de Meio Ambiente aprovou nova política de sustentabilidade para prédios públicos.",
		imageUrl: "/api/placeholder/400/250",
	},
];
