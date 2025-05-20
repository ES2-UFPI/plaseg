import {
	Package,
	Tags,
	FileText,
	UserCog,
	Banknote,
	Barcode,
	FolderKanban,
	Settings,
	FileStack,
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
		icon: <Tags size={24} className="text-blue-500" />,
		title: "Tipos",
		description:
			"Cadastre, edite e gerencie os tipos de produtos, serviços e categorias utilizados no sistema",
		url: "/admin/tipos",
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
		icon: <FileStack size={24} className="text-blue-500" />,
		title: "Documentos Obrigatórios",
		description: "Gerencie os documentos obrigatórios do sistema.",
		url: "/admin/documentos-obrigatorios",
		ready: true,
	},
	{
		icon: <Banknote size={24} className="text-blue-500" />,
		title: "Oportunidades",
		description:
			"Cadastre, edite e gerencie as oportunidades de financiamento que os municípios poderão acessar.",
		url: "/admin/oportunidades",
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
		icon: <Barcode size={24} className="text-blue-500" />,
		title: "Produtos Específicos",
		description:
			"Cadastre, edite e gerencie os produtos específicos que serão oferecidos aos municípios.",
		url: "/admin/produtos-especificos",
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
		icon: <FileText size={24} className="text-blue-500" />,
		title: "Contratos",
		description:
			"Gerencie a documentação contratual, incluindo modelos, versões e status dos contratos ativos",
		url: "/admin/contratos",
		ready: false,
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