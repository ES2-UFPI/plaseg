import { Button } from "../ui/button";
import { WhyCards } from "./why-cards";

export function Why() {
	return (
		<section id="por-que-escolher" className="w-full py-36">
			<div
				className="flex flex-col gap-8 w-[1000px] mx-auto items-center justify-center
				bg-muted/30 rounded-2xl p-8 py-12"
			>
				<h1 className="text-4xl font-bold leading-tight">
					Por que escolher a PlaSeg?
				</h1>

				<div className="w-full flex flex-col items-center  gap-4 mt-4">
					<WhyCards />
				</div>

				<span className="text-muted-foreground mt-4">
					Não perca tempo! Faça parte da PlaSeg agora e leve inovação para a
					segurança pública da sua região.
				</span>

				<Button className="font-bold px-8 rounded-full">Cadastre-se</Button>
			</div>
		</section>
	);
}
