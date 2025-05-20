import { AdministratorsTableContainer } from "@/components/admin/administrators/table/administrators-table-container";

export default function Administrators() {
	return (
		<div className="w-full h-screen">
			<div className="max-w-[1400px] mx-auto flex flex-col py-4 md:py-6 gap-6 h-full box-content">
				<AdministratorsTableContainer />
			</div>
		</div>
	);
}
