import {
	RequiredDocument,
	RequiredDocumentProps,
} from "../../src/domain/entities/required-document";

export function makeRequiredDocument(
	override: Partial<RequiredDocumentProps> = {}
) {
	const requiredDocument = RequiredDocument.create({
		name: "Documento Obrigatório",
		description: "Descrição do Documento Obrigatório",
		model: "https://exemplo.com.br/documentos/modelo-padrao.pdf",
		...override,
	});

	return requiredDocument;
}