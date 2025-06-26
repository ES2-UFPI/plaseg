import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { OpportunityDetailsDocument } from "./opportunity-details-document";
import { CreateProjectDialog } from "./create-project-dialog";
import { Opportunity } from "@/@schemas/opportunity";

interface OpportunityDetailsProps {
	opportunity: Opportunity;
}

export function OpportunityDetails({ opportunity }: OpportunityDetailsProps) {
	return (
		<div className="col-span-3 py-6">
			<div className="p-6 flex flex-col gap-6 rounded-2xl border border-muted bg-white">
				<div className="w-full flex items-start justify-between">
					<div className="flex flex-col gap-1">
						<h1 className="text-2xl leading-snug font-semibold">
							{opportunity.title}
						</h1>

						<span className="text-muted-foreground">
							{opportunity.responsibleAgency}
						</span>
					</div>

					<div className="flex items-center gap-4">
						<Button variant="outline" className="w-[100px]" asChild>
							<Link to="/oportunidades">Cancelar</Link>
						</Button>

						<CreateProjectDialog opportunityId={opportunity.id} />
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<span className="text-lg font-medium">Descrição</span>
					<p className="text-muted-foreground">{opportunity.description}</p>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-lg font-medium">Documentação Obrigatória</span>

					{opportunity.requiredDocuments.map((document) => (
						<OpportunityDetailsDocument key={document.id} document={document} />
					))}
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-lg font-medium">Documentos do Projeto</span>

					{opportunity.documents.map((document, index) => (
						<div key={document.id} className="flex flex-col gap-2">
							<span className="text-lg font-medium flex items-center gap-2">
								<div
									className="w-6 h-6 rounded-full bg-muted text-foreground flex items-center
								justify-center text-sm"
								>
									{index + 1}
								</div>

								<span
									key={`name-${document.id}`}
									className="text-base font-normal"
								>
									{document.name}
								</span>
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
