export const statesOptions = async (): Promise<
	{
		value: string;
		label: string;
	}[]
> => {
	const response = await fetch(
		"https://servicodados.ibge.gov.br/api/v1/localidades/estados"
	);
	const estados = await response.json();

	return estados.map((estado: { nome: string }) => ({
		value: estado.nome,
		label: estado.nome,
	}));
};
