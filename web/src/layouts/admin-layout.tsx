import { Header } from "@/components/header/header";
import { Navbar } from "@/components/navbar/navbar";
import { NavbarItem } from "@/components/navbar/navbar-item";
import { AppLayout } from "@/layouts/app-layout";
import { LayoutDashboard } from "lucide-react";

export default function AdminLayout() {
	return (
		<AppLayout className="bg-muted/50">
			<Header>
				<Navbar>
					<NavbarItem
						title="Dashboard"
						icon={<LayoutDashboard size={16} />}
						link="/admin/dashboard"
					/>
				</Navbar>
			</Header>
		</AppLayout>
	);
}
