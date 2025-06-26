import { Header } from "@/components/header/header";
import { AppLayout } from "./app-layout";
import { Navbar } from "@/components/navbar/navbar";
import { NavbarItem } from "@/components/navbar/navbar-item";
import { LayoutDashboard } from "lucide-react";

export default function AdminLayout() {
	return (
		<AppLayout className="bg-muted/50">
			<Header>
				<Navbar>
					<NavbarItem
						title="Dashboard"
						icon={<LayoutDashboard size={16} />}
						link="/admin"
					/>
				</Navbar>
			</Header>
		</AppLayout>
	);
}
