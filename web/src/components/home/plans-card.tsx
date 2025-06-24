import { Building2, House, User } from "lucide-react";

const plans = [
	{
		name: "Plano Estadual e Municipal",
		price: "R$24.000,00",
		duration: "12 meses de acesso",
		icon: <House />,
	},
	{
		name: "Plano Empresa",
		price: "R$18.000,00",
		duration: "12 meses de acesso",
		icon: <Building2 />,
	},
	{
		name: "Plano Consultor",
		price: "R$6.000,00",
		duration: "12 meses de acesso",
		icon: <User />,
	},
];

export function PlansCard() {
	return plans.map((plan) => {
		return (
			<div
				key={plan.name}
				className="w-full border rounded-lg p-8 text-left flex flex-col gap-4 hover:bg-muted/30
				transition-all duration-300 hover:shadow-sm"
			>
				{plan.icon}
				<div className="flex flex-col">
					<strong>{plan.name}</strong>
					<span className="text-muted-foreground">{plan.duration}</span>
				</div>

				<strong className="text-2xl font-bold">{plan.price}</strong>
			</div>
		);
	});
}
