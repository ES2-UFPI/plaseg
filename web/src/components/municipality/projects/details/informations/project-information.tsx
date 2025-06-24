import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ProjectInformationForm } from "./project-information-form";
import { Project } from "@/@schemas/project";

interface ProjectInformationProps {
	project: Project;
}

export function ProjectInformation({ project }: ProjectInformationProps) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="w-full">
			<Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
				<CollapsibleTrigger className="flex items-center gap-2 w-full border-b border-slate-200 pb-4">
					{!isOpen && <ChevronDown className="animate-in spin-in-90" />}

					{isOpen && <ChevronUp className="animate-in spin-in-90" />}

					<h2 className="text-xl font-semibold">Informações do Projeto</h2>
				</CollapsibleTrigger>

				<CollapsibleContent className="space-y-4">
					<ProjectInformationForm project={project} />
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
