import { User } from "@/@types/auth/user";
import { Button } from "@/components/ui/button";
import { useAllowUser } from "@/hooks/admin/users/use-allow-user";
import { LoaderCircle } from "lucide-react";

interface AllowUserButtonProps {
	user: User;
}

export function AllowUserButton({ user }: AllowUserButtonProps) {
	const { allowUserFn, isLoadingAlloUser } = useAllowUser(user.id);

	if (user.allowed) {
		return (
			<Button
				variant="secondary"
				size="sm"
				className="font-semibold w-[170px]"
				onClick={() => allowUserFn(user.id)}
				disabled={isLoadingAlloUser}
			>
				{isLoadingAlloUser && <LoaderCircle className="animate-spin" />}
				Negar Acesso
			</Button>
		);
	}

	return (
		<Button
			size="sm"
			className="font-semibold w-[170px]"
			onClick={() => allowUserFn(user.id)}
			disabled={isLoadingAlloUser}
		>
			{isLoadingAlloUser && <LoaderCircle className="animate-spin" />}
			Permitir Acesso
		</Button>
	);
}
