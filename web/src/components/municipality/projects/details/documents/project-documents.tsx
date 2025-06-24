import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ProjectDocumentCard } from "./project-document-card";
import { Project } from "@/@schemas/project";

interface ProjectDocumentsProps {
	project: Project;
}

export function ProjectDocuments({ project }: ProjectDocumentsProps) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="w-full">
			<Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
				<CollapsibleTrigger className="flex items-center gap-2 w-full border-b border-slate-200 pb-4">
					{!isOpen && <ChevronDown className="animate-in spin-in-90" />}

					{isOpen && <ChevronUp className="animate-in spin-in-90" />}

					<h2 className="text-xl font-semibold">Documentos</h2>
				</CollapsibleTrigger>

				<CollapsibleContent className="space-y-4">
					{project.documents.map((document) => (
						<ProjectDocumentCard
							key={document.name}
							projectId={project.id}
							document={document}
						/>
					))}
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
