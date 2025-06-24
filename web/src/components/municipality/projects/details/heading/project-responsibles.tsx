import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function ProjectResponsibles() {
	return (
		<>
			<Avatar>
				<AvatarImage
					src="https://github.com/izaiasmorais.png"
					alt="@izaiasmorais"
				/>
				<AvatarFallback>I</AvatarFallback>
			</Avatar>

			<Avatar>
				<AvatarImage src="https://github.com/suzanaps.png" alt="@suzanaps" />
				<AvatarFallback>S</AvatarFallback>
			</Avatar>
		</>
	);
}
