import { Document } from "@/@schemas/project";
import { Button } from "@/components/ui/button";
import { CircleProgressIcon } from "@/components/ui/circle-progress-icon";
import { SquarePen } from "lucide-react";
import { Link } from "react-router";

interface ProjectDocumentCardProps {
	projectId: string;
	document: Document;
}

export function ProjectDocumentCard({
	projectId,
	document,
}: ProjectDocumentCardProps) {
	return (
		<div
			className="bg-white rounded-lg border border-slate-200 p-6
					flex justify-between items-center gap-4"
		>
			<div className="flex items-center gap-4">
				<CircleProgressIcon percentage={(0 / 1) * 100} />

				<div className="flex flex-col">
					<strong className="font-medium">{document.name}</strong>

					<span className="text-muted-foreground text-sm">
						{0} de {0} concluídos
					</span>
				</div>
			</div>

			<Button variant="outline" size="icon" asChild>
				<Link to={`/projetos/${projectId}/documentos/${document.id}`}>
					<SquarePen />
				</Link>
			</Button>
		</div>
	);
}
