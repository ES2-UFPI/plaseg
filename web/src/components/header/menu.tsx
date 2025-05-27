import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { Link } from "react-router";

interface MenuProps {
	name: string;
	email: string;
}

export function Menu({ name, email }: MenuProps) {
	const logout = useAuthStore((state) => state.logout);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="outline-none">
				<div className="flex items-center justify-between gap-3 w-[250px]">
					<div className="flex flex-col items-start gap-0 truncate">
						<strong className="text-sm">{name}</strong>

						<span className="text-sm font-medium text-muted-foreground">
							{email}
						</span>
					</div>

					<Avatar>
						<AvatarFallback className="bg-[#1A202C]">
							{name.slice(0, 1)}
						</AvatarFallback>
					</Avatar>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56 mr-4">
				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer w-full">
						<Link to="#" className="flex items-center gap-2">
							<Settings className="h-4 w-4" />

							<span>Configurações</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="cursor-pointer w-full !text-red-500"
					onClick={() => logout()}
				>
					<LogOut className="h-4 w-4 text-red-500" />

					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
