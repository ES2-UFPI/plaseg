import { Copy, Download } from "lucide-react";
import { ProjectProgress } from "./project-progress";
import { Button } from "@/components/ui/button";
import { Project } from "@/@schemas/project";
import { ProjectValue } from "./project-value";

interface ProjectHeadingProps {
	project: Project;
}

export function ProjectHeading({ project }: ProjectHeadingProps) {
	const requestedValue = project.requestedItems.reduce(
		(acc, item) => acc + item.baseProduct.unitValue * item.quantity,
		0
	);

	const counterpartValue = () => {
		if (project.opportunity.counterpartPercentage === 0) return 0;

		return (
			(requestedValue * (project.opportunity.counterpartPercentage ?? 0)) / 100
		);
	};

	const totalValue = () => {
		return requestedValue + counterpartValue();
	};

	return (
		<div className="w-full py-6">
			<div className="flex justify-between">
				<div className="flex items-center gap-10">
					<ProjectProgress percentage={0} />

					<ProjectValue
						title="Valor Base"
						tooltipText="Uma estimativa do valor do projeto"
						value={project.baseValue ?? 0}
					/>

					<ProjectValue
						title="Valor Solicitado"
						tooltipText="Soma dos valores totais dos itens solicitados
						(não pode ultrapassar o valor base do projeto)"
						value={requestedValue}
					/>

					<ProjectValue
						title="Valor da Contrapartida"
						tooltipText="% da contrapartida calculado em cima do valor solicitado"
						value={counterpartValue()}
					/>

					<ProjectValue
						title="Valor Total"
						tooltipText="Valor total do projeto, somando o valor soloicitado e o valor de contrapartida"
						value={totalValue()}
					/>

					{/* <div className="flex flex-col gap-2">
						<span className="text-sm text-muted-foreground">
							Contrapartida (30%)
						</span>

						<div className="flex items-center gap-2">
							<div className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center">
								<DollarSign size={18} />
							</div>

							<span className="font-medium">R$ 45.000,00</span>
						</div>
					</div> */}

					{/* <div className="flex flex-col gap-2">
						<span className="text-sm text-muted-foreground">Responsáveis</span>

						<div className="flex items-center gap-2">
							<ProjectResponsibles />
						</div>
					</div> */}
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-muted-foreground text-sm">Ações</span>

					<div className="flex items-center gap-4">
						<Button variant="outline">
							<Copy />
							Duplicar
						</Button>

						<Button className="bg-slate-950 hover:bg-slate-950/90">
							<Download />
							Exportar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
