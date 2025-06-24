const steps = [
	{
		title: "Cadastre-se",
		description:
			"Escolha seu perfil (Estado, Município, Empresa ou Consultor) e faça seu registro na PlaSeg.",
	},
	{
		title: "Escolha um Plano",
		description:
			"Acesse editais, atas de preços e serviços exclusivos com planos sob medida para você.",
	},
	{
		title: "Comece a Usar",
		description:
			"Busque editais, gere projetos automaticamente, contrate consultores e acompanhe tudo em tempo real.",
	},
];

export function Steps() {
	return steps.map((step, index) => {
		return (
			<div
				key={step.title}
				className="flex w-full items-center gap-4 bg-white border rounded-lg p-8"
			>
				<div
					className="w-10 h-10 rounded-full border-2 border-blue-500 text-blue-500 font-bold
				flex items-center justify-center"
				>
					{index + 1}
				</div>

				<div className="flex flex-col text-left">
					<strong>{step.title}</strong>
					<p className="text-muted-foreground">{step.description}</p>
				</div>
			</div>
		);
	});
}
