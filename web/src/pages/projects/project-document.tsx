import { ProjectDocument } from "@/components/municipality/projects/details/documents/project-document";
import { useGetProjectById } from "@/hooks/municipalities/projects/use-get-project-by-id";
import { useParams } from "react-router";
import { ProjectDocumentSkeleton } from "./project-document-skeleton";

export default function ProjectDocumentPage() {
	const { projectId } = useParams<{ projectId: string }>();
	const { documentId } = useParams<{ documentId: string }>();

	const { project, isLoadingGetProjectById } = useGetProjectById(projectId!);

	if (!project) return <ProjectDocumentSkeleton />;

	const document = project.documents.find(
		(document) => document.id === documentId
	);

	if (isLoadingGetProjectById) return <ProjectDocumentSkeleton />;

	return (
		<main className="flex flex-col gap-6 py-6 h-full box-content">
			<ProjectDocument document={document!} projectId={projectId!} />
		</main>
	);
}
