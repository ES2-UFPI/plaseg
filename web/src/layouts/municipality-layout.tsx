import { Header } from "@/components/header/header";
import { AppLayout } from "./app-layout";
import { Navbar } from "@/components/navbar/navbar";
import { NavbarItem } from "@/components/navbar/navbar-item";
import { ScrollText, KanbanSquare } from "lucide-react";

export default function MunicipalityLayout() {
	return (
		<AppLayout className="bg-muted/50">
			<Header>
				<Navbar>
					<NavbarItem
						title="Oportunidades"
						icon={<ScrollText size={16} />}
						link="/oportunidades"
					/>

					<NavbarItem
						title="Projetos"
						icon={<KanbanSquare size={16} />}
						link="/projetos"
					/>
				</Navbar>
			</Header>
		</AppLayout>
	);
}
