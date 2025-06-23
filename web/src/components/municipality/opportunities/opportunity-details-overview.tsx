import { Opportunity } from "@/@types/common/opportunity";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface OpportunityDetailsOverviewProps {
	opportunity: Opportunity;
}

export function OpportunityDetailsOverview({
	opportunity,
}: OpportunityDetailsOverviewProps) {
	return (
		<div className="p-6 w-full">
			<div className="p-6 flex flex-col gap-6 rounded-2xl border border-muted bg-white">
				<div className="w-full flex items-start justify-between">
					<div className="flex flex-col gap-1">
						<h1 className="text-3xl leading-snug font-medium">
							{opportunity.title}
						</h1>

						<span className="text-muted-foreground">
							{opportunity.responsibleAgency}
						</span>
					</div>

					<div className="flex items-center gap-4">
						<Button variant="outline" className="w-[100px]">
							<Link to="/municipio/oportunidades">Cancelar</Link>
						</Button>

						<Button
							className="bg-dark hover:bg-dark/90 text-primary-foreground transition-colors
							w-[100px]"
						>
							Participar
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<strong className="font-medium">Descrição</strong>
					<p className="text-muted-foreground">{opportunity.description}</p>
				</div>

				<div className="flex flex-col gap-1">
					<strong className="font-medium">Documentação Obrigatória</strong>

					<ul className="list-disc pl-5 space-y-4">
						{opportunity.requiredDocuments.map((document) => (
							<li key={document.id}>
								<span>{document.name}</span>
								<p className="text-muted-foreground text-sm">
									{document.description}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}