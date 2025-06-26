import { ProjectHeading } from "@/components/municipality/projects/details/heading/project-heading";
import { ProjectTasks } from "@/components/municipality/projects/details/tasks/project-tasks";
import { ProjectInformation } from "@/components/municipality/projects/details/informations/project-information";
import { Link, useParams } from "react-router";
import { Tag } from "@/components/ui/tag";
import { useGetProjectById } from "@/hooks/municipalities/projects/use-get-project-by-id";
import { ProjectsDetailsSkeleton } from "./project-details-skeleton";
import { ProjectDocuments } from "@/components/municipality/projects/details/documents/project-documents";
import { ProjectItems } from "@/components/municipality/projects/details/items/project-items";
import { slugfy } from "@/utils/slugfy";

export default function ProjectDetails() {
	const { projectId } = useParams<{ projectId: string }>();

	const { project, isLoadingGetProjectById } = useGetProjectById(projectId!);

	if (isLoadingGetProjectById) return <ProjectsDetailsSkeleton />;

	if (project)
		return (
			<main className="flex flex-col gap-6 py-6 h-full box-content pb-24">
				<div className="space-y-2">
					<h1 className="text-2xl font-semibold">{project.title}</h1>

					<div className="flex gap-2">
						<Tag className="bg-black hover:bg-black/90 text-primary-foreground">
							<Link to={`/oportunidades/${slugfy(project.opportunity.title)}`}>
								{project.opportunity.title}
							</Link>
						</Tag>

						<Tag className="bg-black hover:bg-black/90 text-primary-foreground">
							{project.municipality.name}
						</Tag>
					</div>
				</div>

				<ProjectHeading project={project} />

				<div className="grid grid-cols-3 gap-6">
					<div className="flex flex-col gap-6 col-span-2">
						<ProjectInformation project={project} />
						<ProjectDocuments project={project} />
						<ProjectItems project={project} />
						{/* <ProjectAttachments /> */}
					</div>

					<div className="col-span-1">
						<ProjectTasks />
					</div>
				</div>
			</main>
		);
}
