import { Card } from "@/components/ui/card";
import { Document } from "@/@schemas/project";
import { nestFields } from "@/utils/nested-fields";

interface ProjectDocumentPdfProps {
	document: Document;
}

const isIntegerString = (str: string): boolean => {
	const num = parseFloat(str);
	return !isNaN(num) && Number.isInteger(num);
};

function renderFields(fields: ReturnType<typeof nestFields>) {
	return (
		<div className="space-y-2">
			{fields.map((field) => (
				<div key={field.id}>
					<div
						className={`text-black p-2 border-y border-black
						${isIntegerString(field.order) ? "bg-muted font-bold uppercase" : "font-medium"}
						${!isIntegerString(field.order) ? "border-0" : ""}
						${field.order === "1" ? "!border-0" : ""}`}
					>
						{field.order}. {field.name}
					</div>

					{field.value && (
						<div className="text-black text-sm px-3 py-2">{field.value}</div>
					)}

					{field.fields &&
						field.fields.length > 0 &&
						renderFields(field.fields)}
				</div>
			))}
		</div>
	);
}

export default function ProjectDocumentPdf({
	document,
}: ProjectDocumentPdfProps) {
	const nestedFields = nestFields(document.fields);

	return (
		<div className="min-h-screen py-8 px-4">
			<div className="max-w-4xl mx-auto">
				<Card className="w-full bg-white shadow-lg rounded-none">
					<div className="p-8 space-y-6">
						{/* Header with Logo */}
						<div className="flex justify-center mb-8">
							<div className="relative">
								<img
									src="/teresina.png"
									alt="Teresina Flag"
									className="object-contain w-32 h-24 "
								/>
							</div>
						</div>

						{/* Title */}
						<div className="text-center space-y-4">
							<h1 className="text-xl font-bold text-black">
								Justificativa Completa do Projeto
							</h1>
						</div>

						{/* Introduction Paragraph */}
						<div className="text-sm text-black leading-relaxed text-justify">
							<h2 className="text-base font-semibold text-black">
								Proposta Transferegov.br nº: 000064/2023
							</h2>

							<p className="indent-8">
								Na qualidade de dirigente máximo do proponente (outra
								autoridade, por delegação de competência), complemento a
								justificativa do projeto estruturado no âmbito da Proposta
								Transferegov.br acima identificada nos seguintes termos:
							</p>
						</div>

						{/* Recursive fields rendering */}
						<div className="border border-black mt-8">
							{renderFields(nestedFields)}
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
