import { ArrowLeft } from "lucide-react";
import { ProjectDocumentField } from "./project-document-field";
import { ProjectDocumentTopics } from "./project-document-topics";
import { Document } from "@/@schemas/project";
import { Link } from "react-router";
import { ProjectDocumentPdfSheet } from "./project-document-pdf-sheet";
import { nestFields } from "@/utils/nested-fields";

interface ProjectDocumentProps {
	document: Document;
	projectId: string;
}

export function ProjectDocument({ document, projectId }: ProjectDocumentProps) {
	const nestedFields = nestFields(document.fields);

	return (
		<div className="w-full flex flex-col gap-6">
			<div className="w-full flex items-center gap-2">
				<div className="cursor-pointer">
					<Link to={`/projetos/${projectId}`}>
						<ArrowLeft size={20} />
					</Link>
				</div>

				<h1 className="text-2xl font-semibold">{document.name}</h1>

				<ProjectDocumentPdfSheet document={document} />
			</div>

			<div className="grid grid-cols-3 gap-8">
				<ProjectDocumentTopics document={document} />

				<div className="col-span-2 flex flex-col">
					{nestedFields.map((field) => (
						<ProjectDocumentField key={field.id} field={field} />
					))}
				</div>
			</div>
		</div>
	);
}
