import { DashboardMenuItem } from "./dashboard-menu-item";
import { adminMenuItems } from "@/mocks/admin/menu";

export function DashboardMenu() {
	return (
		<main className="grid gap-6 md:px-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{adminMenuItems.map((item) => (
				<DashboardMenuItem
					icon={item.icon}
					key={item.title}
					title={item.title}
					description={item.description}
					url={item.url}
					ready={item.ready}
				/>
			))}
		</main>
	);
}
