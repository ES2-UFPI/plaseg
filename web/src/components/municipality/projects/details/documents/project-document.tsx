import { ArrowLeft } from "lucide-react";
import { ProjectDocumentTopic } from "./project-document-topic";
import { ProjectDocumentTopics } from "./project-document-topics";
import { Document } from "@/@schemas/project";
import { Link } from "react-router";

interface ProjectDocumentProps {
	document: Document;
	projectId: string;
}

export function ProjectDocument({ document, projectId }: ProjectDocumentProps) {
	return (
		<div className="w-full flex flex-col gap-6">
			<div className="w-full flex items-center gap-2">
				<div className="cursor-pointer">
					<Link to={`/projetos/${projectId}`}>
						<ArrowLeft size={20} />
					</Link>
				</div>

				<h1 className="text-2xl font-semibold">{document.name}</h1>
			</div>

			<div className="grid grid-cols-3 gap-8">
				<ProjectDocumentTopics document={document} />

				<div className="col-span-2 flex flex-col">
					{document.fields.map((field) => (
						<ProjectDocumentTopic key={field.id} field={field} />
					))}
				</div>
			</div>
		</div>
	);
}
