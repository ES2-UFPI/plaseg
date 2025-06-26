import { ProjectsTableContainer } from "@/components/municipality/projects/table/projects-table-container";

export default function Projects() {
	return (
		<div className="flex flex-col py-4 md:py-6 min-h-full">
			<ProjectsTableContainer />
		</div>
	);
}
