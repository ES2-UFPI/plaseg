import { Link } from "react-router";
import { Button } from "../ui/button";

export function PublicSecurity() {
	return (
		<section id="home" className="w-full py-36">
			<div className="flex w-[1200px] mx-auto items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-4 text-center w-[1000px]">
					<h1 className="text-4xl leading-tight font-bold">
						Transforme a Segurança Pública <br /> na sua Região!
					</h1>

					<p className="text-lg text-muted-foreground leading-snug">
						A PlaSeg é a primeira plataforma digital do Brasil voltada para
						ajudar estados e municípios a captarem e executarem projetos
						envolvendo recursos financiados pelo governo. Ela gera esboços de
						projetos de forma automática, incluindo textos, orçamentos, valores
						e tudo que é necessário para concorrer em uma oportunidade de
						financiamento. Além disso, permite encontrar consultores para
						auxiliar em projetos e conectar empresas e fornecedores de serviços
						de segurança.
					</p>

					<div
						className="mt-12 max-w-max flex items-center gap-12 p-4 rounded-full border
					font-medium text-sm"
					>
						Cadastre-se agora e simplifique a captação e gestão de recursos para
						segurança pública!
						<Link to={"/cadastro"}>
							<Button className="font-bold px-8 rounded-full">
								Cadastre-se
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
