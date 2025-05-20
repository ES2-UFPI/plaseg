import { DashboardMenu } from "@/components/admin/dashboard-menu/dashboard-menu";

export default function Dashboard() {
	return (
		<div className="w-full h-screen">
			<div className="max-w-[1400px] mx-auto flex flex-col py-4 md:py-6 gap-6 h-full box-content">
				<DashboardMenu />
			</div>
		</div>
	);
}
