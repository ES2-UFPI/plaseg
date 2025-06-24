export const municipalitiesOptions = async (): Promise<
	{
		value: string;
		label: string;
	}[]
> => {
	const response = await fetch(
		"https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
	);

	const municipios = await response.json();

	return municipios.map((municipio: { nome: string }) => ({
		value: municipio.nome,
		label: municipio.nome,
	}));
};
