import {
	Package,
	Tags,
	UserCog,
	Banknote,
	FolderKanban,
	Settings,
	Users,
} from "lucide-react";
import { ReactNode } from "react";

interface MenuItem {
	icon: ReactNode;
	title: string;
	description: string;
	ready: boolean;
	url: string;
}

export const adminMenuItems: MenuItem[] = [
	{
		icon: <Banknote size={24} className="text-blue-500" />,
		title: "Oportunidades",
		description:
			"Cadastre, edite e gerencie as oportunidades de financiamento que os municípios poderão acessar.",
		url: "/admin/oportunidades",
		ready: true,
	},
	{
		icon: <Tags size={24} className="text-blue-500" />,
		title: "Tipos",
		description:
			"Cadastre, edite e gerencie os tipos de produtos, serviços e categorias utilizados no sistema",
		url: "/admin/tipos",
		ready: true,
	},
	{
		icon: <Package size={24} className="text-blue-500" />,
		title: "Produtos Base",
		description:
			"Cadastre, edite e gerencie o catálogo completo de produtos que vão servir de base os produtos específicos.",
		url: "/admin/produtos-base",
		ready: true,
	},
	{
		icon: <FolderKanban size={24} className="text-blue-500" />,
		title: "Tipos de Projeto",
		description:
			"Defina e gerencie os tipos de projetos que podem ser cadastrados no sistema",
		url: "/admin/tipos-de-projeto",
		ready: true,
	},
	{
		icon: <Users size={24} className="text-blue-500" />,
		title: "Usuários",
		description:
			"Aprove ou bloqueie os usuários para acessarem o sistema e suas funcionalidades",
		url: "/admin/usuarios",
		ready: true,
	},
	{
		icon: <UserCog size={24} className="text-blue-500" />,
		title: "Administradores",
		description:
			"Controle o acesso ao sistema, gerencie perfis, permissões e dados dos administradores",
		url: "/admin/administradores",
		ready: true,
	},
	{
		icon: <Settings size={24} className="text-blue-500" />,
		title: "Configurações",
		description:
			"Gerencie as configurações do sistema, incluindo parâmetros, templates e notificações",
		url: "/admin/configuracoes",
		ready: false,
	},
];
