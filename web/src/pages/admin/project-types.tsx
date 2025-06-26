import { ProjectTypesContainer } from "@/components/admin/project-types/table/project-types-table-container";

export default function ProjectTypes() {
	return (
		<div className="flex flex-col py-4 md:py-6 h-[calc(100vh-10rem)]">
			<ProjectTypesContainer />
		</div>
	);
}
