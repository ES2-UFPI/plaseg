import { cn } from "@/lib/utils";
import {
	Building2,
	Users,
	FolderOpen,
	MapPin,
	UserCheck,
	FileText,
} from "lucide-react";

interface StepIndicatorProps {
	currentStep: number;
	totalSteps: number;
}

const steps = [
	{
		title: "Dados Gerais do Município",
		subtitle: "Pendente",
		icon: Building2,
	},
	{
		title: "Equipe Qualificada",
		subtitle: "Pendente",
		icon: Users,
	},
	{
		title: "Projetos anteriores",
		subtitle: "Pendente",
		icon: FolderOpen,
	},
	{
		title: "Setores de Alocações de Bens",
		subtitle: "Pendente",
		icon: MapPin,
	},
	{
		title: "Responsáveis pela gestão",
		subtitle: "Pendente",
		icon: UserCheck,
	},
	{
		title: "Contratos de manutenção",
		subtitle: "Pendente",
		icon: FileText,
	},
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
	return (
		<div className="bg-muted/30 flex items-center justify-center p-6">
			<div className="w-[400px]">
				<div className="mb-8">
					<h1 className="text-3xl font-bold">Plaseg</h1>
					<p className="text-sm text-muted-foreground">Cadastro de Município</p>
				</div>

				<div className="space-y-4">
					{steps.map((step, index) => {
						const Icon = step.icon;
						const isActive = index === currentStep;
						const isCompleted = index < currentStep;

						return (
							<div
								key={index}
								className={cn(
									"flex items-center space-x-3 p-3 rounded-lg transition-colors",
									isActive && "bg-blue-50 border border-blue-200",
									!isActive && !isCompleted && "text-gray-400"
								)}
							>
								<div
									className={cn(
										"flex items-center justify-center w-10 h-10 rounded-full border-2",
										isActive && "bg-blue-500 border-blue-500 text-white",
										isCompleted && "bg-green-500 border-green-500 text-white",
										!isActive && !isCompleted && "border-gray-300 text-gray-400"
									)}
								>
									<Icon className="w-5 h-5" />
								</div>
								<div className="flex-1">
									<h3
										className={cn(
											"text-sm font-medium",
											isActive && "text-blue-900",
											isCompleted && "text-green-900"
										)}
									>
										{step.title}
									</h3>
									<p
										className={cn(
											"text-xs",
											isActive && "text-blue-600",
											isCompleted && "text-green-600",
											!isActive && !isCompleted && "text-gray-400"
										)}
									>
										{isCompleted ? "Concluído" : step.subtitle}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
