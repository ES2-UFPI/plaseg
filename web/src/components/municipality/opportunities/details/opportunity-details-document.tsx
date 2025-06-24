import { RequiredDocument } from "@/@types/common/opportunity";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface OpportunityDetailsDocumentProps {
	document: RequiredDocument;
}

export function OpportunityDetailsDocument({
	document,
}: OpportunityDetailsDocumentProps) {
	return (
		<div
			key={document.id}
			className="flex justify-between items-center p-4 rounded-lg border border-slate-200
			gap-6"
		>
			<div className="flex flex-col gap-2">
				<span>{document.name}</span>
				<p className="text-muted-foreground text-sm">{document.description}</p>
			</div>

			<Button variant="secondary" asChild>
				<Link to={document.model} target="_blank">
					Ver modelo
				</Link>
			</Button>
		</div>
	);
}
