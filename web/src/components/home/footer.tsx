import { Button } from "../ui/button";

export function Footer() {
	return (
		<footer id="contato" className="bg-dark text-white w-full py-36">
			<div className="flex flex-col gap-8 w-[1200px] mx-auto">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">
						Cadastre-se agora e revolucione a segurança pública na sua cidade!
					</span>
					<Button className="font-bold px-8 rounded-full">Cadastre-se</Button>
				</div>

				<hr className="border-dashed border-slate-700" />

				<div className="flex justify-between">
					<h1 className="text-2xl font-bold leading-tight">PlaSeg</h1>

					<div className="flex gap-32">
						<div className="flex flex-col gap-4">
							<strong>Sobre</strong>
							<ul className="flex flex-col gap-2 text-muted-foreground">
								<li>Home</li>
								<li>O que é PlaSeg?</li>
								<li>Para quem é a PlaSeg?</li>
								<li>Como funciona?</li>
								<li>Planos</li>
								<li>Por que escolher?</li>
								<li>Fale Conosco</li>
							</ul>
						</div>

						<div className="flex flex-col gap-4">
							<strong>Contato</strong>
							<ul className="flex flex-col gap-2 text-muted-foreground">
								<li>contato@plaseg.com.br</li>
								<li>www.plaseg.com.br</li>
								<li>(99) 9 9999-9999</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
