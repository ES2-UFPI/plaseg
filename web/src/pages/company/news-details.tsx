import { SeparatorTitle } from "@/components/company/news/separtor-title";
import { Sugestion } from "@/components/company/news/sugestion";
import { MoreNews } from "@/components/company/news/more-news";

export default function NewsDetails() {
	return (
		<div className="flex flex-col w-full justify-center p-8 items-center">
			<div className="flex flex-col w-[680px] gap-6">
				<h1 className="text-3xl font-extrabold">
					Nova Oportunidade de Financiamento para Projetos Municipais
				</h1>

				<SeparatorTitle />

				<p className="text-lg">
					Os municípios brasileiros terão uma nova oportunidade para aprimorar
					suas políticas de segurança pública. O governo federal anunciou, nesta
					semana, a abertura de um novo programa de financiamento destinado a
					projetos que visam fortalecer a segurança nos municípios. A iniciativa
					busca oferecer suporte financeiro para modernização das forças
					policiais, investimentos em tecnologia e aprimoramento das ações de
					prevenção à violência.
				</p>

				<div className="w-full h-[500px] rounded-lg bg-gray-100" />

				<p className="text-lg">
					O programa será coordenado pelo Ministério da Justiça e Segurança
					Pública e prevê a liberação de recursos por meio de linhas de crédito
					específicas para prefeituras que apresentarem projetos alinhados às
					diretrizes nacionais de segurança. O objetivo é incentivar a adoção de
					soluções inovadoras, como o uso de inteligência artificial para
					monitoramento de áreas de risco, instalação de câmeras de vigilância e
					aprimoramento da comunicação entre órgãos de segurança.
				</p>

				<p className="text-lg">
					As prefeituras interessadas deverão apresentar suas propostas dentro
					do prazo estabelecido pelo edital, demonstrando a viabilidade técnica
					e financeira dos projetos. Além disso, os municípios que comprovarem a
					integração de suas políticas de segurança com ações sociais e
					educacionais terão prioridade na seleção.
				</p>

				<p className="text-lg">
					O ministro da Justiça destacou a importância dessa iniciativa para
					fortalecer a segurança local e garantir maior proteção à população.
					"Sabemos que a segurança pública é um dos principais desafios
					enfrentados pelos municípios. Com esse financiamento, queremos dar
					condições para que as cidades possam implementar medidas mais eficazes
					e garantir um ambiente mais seguro para todos", afirmou.
				</p>

				<p className="text-lg">
					Especialistas da área de segurança avaliam que a medida pode
					contribuir significativamente para reduzir índices de criminalidade,
					desde que os recursos sejam aplicados de forma estratégica e
					eficiente. A expectativa é que, com essa nova oportunidade, os
					municípios possam melhorar suas estruturas e oferecer respostas mais
					rápidas e eficazes às demandas da população.
				</p>

				<p className="text-lg">
					As informações completas sobre o edital e os critérios para
					participação estão disponíveis no site oficial do Ministério da
					Justiça e Segurança Pública. Prefeituras interessadas devem se
					organizar para submeter seus projetos dentro do prazo estipulado,
					garantindo assim a chance de obter os recursos necessários para
					fortalecer suas políticas de segurança pública.
				</p>

				<div className="flex mt-7 gap-6">
					<Sugestion text="Segurança" />
					<Sugestion text="Prefeitura" />
					<Sugestion text="Cidade" />
					<Sugestion text="Notícia" />
				</div>

				<SeparatorTitle />
			</div>

			<div className="max-w-[900px] justify-center items-center mt-11">
				<MoreNews />
			</div>
		</div>
	);
}
