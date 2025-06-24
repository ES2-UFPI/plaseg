import { CircleCheckBig } from "lucide-react";

const benefits = [
	{
		title: "Agilidade",
		description:
			"Geração rápida de projetos conforme exigências dos editais.",
	},
	{
		title: "Apoio Especializado",
		description: "Consultores experientes para auxiliar seu projeto.",
	},
	{
		title: "Acesso Rápido a Recursos",
		description: "Editais e atas de preços em um só lugar.",
	},

	{
		title: "Redução de Burocracia",
		description: "Processos simplificados e digitais.",
	},
];

export function WhyCards() {
	return benefits.map((benefit) => {
		return (
			<div className="flex items-center gap-2">
				<CircleCheckBig className="text-blue-500" />

				<div className="flex items-center gap-1">
					<strong>{benefit.title}</strong> {` - `}
					<span>{benefit.description}</span>
				</div>
			</div>
		);
	});
}
