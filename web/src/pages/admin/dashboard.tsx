import { DashboardMenu } from "@/components/admin/dashboard-menu/dashboard-menu";

export default function Dashboard() {
	return (
		<div className="flex flex-col py-4 md:py-6 gap-6 h-full box-content">
			<DashboardMenu />
		</div>
	);
}
