import {
	Bot,
	CircleDollarSign,
	FileText,
	SquareKanban,
	Users,
} from "lucide-react";
import { Feature } from "./feature";

export function WhatIs() {
	return (
		<section id="sobre" className="w-full py-36 bg-muted/30">
			<div className="flex w-[1200px] mx-auto items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-4 text-center w-[1000px]">
					<h1 className="text-4xl font-bold leading-tight">
						O que é a PlaSeg?
					</h1>

					<p className="text-lg text-muted-foreground leading-6">
						A PlaSeg conecta estados, municípios, empresas e consultores para
						otimizar a criação e execução de projetos de segurança pública.
						Nossa plataforma oferece:
					</p>

					<div className="grid grid-cols-2 gap-4 mt-4">
						<Feature text="Consulta oportunidades de financiamento para projetos públicos.">
							<FileText className="text-[#3294F4]" />
						</Feature>

						<Feature
							text="Acesso a atas de registro de preços, facilitando aquisições e
					contratações."
						>
							<CircleDollarSign className="text-[#3294F4]" />
						</Feature>

						<Feature
							text="Contratação de consultores especializados para apoiar na captação e
					execução de recursos."
						>
							<Users className="text-[#3294F4]" />
						</Feature>

						<Feature
							text="Ferramentas de inteligência artificial para
					geração automatizada de projetos."
						>
							<Bot className="text-[#3294F4]" />
						</Feature>

						<Feature
							text="Monitoramento e controle de
					recursos públicos, garantindo eficiência e transparência."
						>
							<SquareKanban className="text-[#3294F4]" />
						</Feature>
					</div>
				</div>
			</div>
		</section>
	);
}
