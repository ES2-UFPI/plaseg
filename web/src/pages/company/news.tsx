import { MoreNews } from "@/components/company/news/more-news";
import { NewsSelect } from "@/components/company/news/news-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function News() {
	const navigate = useNavigate();

	return (
		<div className="p-4 flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Input
					type="text"
					placeholder="Pesquisar Notícia..."
					className="max-w-[300px]"
				/>
				<NewsSelect />
			</div>

			<div className="flex gap-6">
				<div className="max-w-[800px] flex flex-col gap-2">
					<h1 className="text-3xl font-medium">
						Nova Oportunidade de Financiamento para Projetos Municipais
					</h1>

					<span className="text-sm text-muted-foreground flex items-center gap-3">
						<span className="text-foreground">18 de Fervereiro de 2025</span>
						<span>|</span>3 min de leitura
					</span>

					<p className="text-muted-foreground">
						O Governo do Estado, em uma iniciativa inovadora para apoiar o
						desenvolvimento local, acaba de anunciar uma nova oportunidade de
						financiamento destinada a municípios, estados e empresas para
						projetos de infraestrutura, educação, saúde e desenvolvimento
						econômico.
					</p>

					<div className="w-full h-[500px] rounded-lg bg-gray-100" />

					<div className="flex justify-end">
						<Button
							variant="link"
							className="flex items-center gap-2 text-foreground"
							onClick={() => navigate("/empresa/noticia")}
						>
							Acessar <ArrowRight />
						</Button>
					</div>
				</div>

				<MoreNews />
			</div>
		</div>
	);
}
