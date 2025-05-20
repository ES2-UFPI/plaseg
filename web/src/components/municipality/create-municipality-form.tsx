import { useCreateMunicipality } from "@/hooks/municipality/use-create-municipality";
import { Form } from "../ui/form";
import { FormInput } from "../form/form-input";
import { Button } from "../ui/button";
import { FormDatePicker } from "../form/form-date-picker";
import { FormSelect } from "../form/form-select";
import { FormCombobox } from "../form/form-combobox";

const unitTypes = [
	{
		label: "Município",
		value: "municipality",
	},
	{
		label: "Estado",
		value: "state",
	},
];

const federativeUnits = [
	{
		label: "São Paulo",
		value: "SP",
	},
];

export function CreateMunicipalityForm() {
	const { form } = useCreateMunicipality();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmitForm} className="space-y-6">
				<FormInput
					form={form}
					type="text"
					entity="name"
					label="Nome"
					placeholder="Digite o nome do município"
				/>

				<FormDatePicker
					form={form}
					entity="guardInitialDate"
					label="Data de início da guarda"
					placeholder="Digite a data de início da guarda"
				/>

				<FormInput
					form={form}
					type="number"
					entity="guardCount"
					label="Quantidade de guardas"
				/>

				<FormDatePicker
					form={form}
					entity="trafficInitialDate"
					label="Data de início do tráfego"
					placeholder="Digite a data de início do tráfego"
				/>

				<FormInput
					form={form}
					type="number"
					entity="trafficCount"
					label="Quantidade de tráfego"
				/>

				<FormSelect
					form={form}
					entity="unitType"
					label="Tipo de unidade"
					placeholder="Digite o tipo de unidade"
					options={unitTypes}
				/>

				<FormCombobox
					form={form}
					entity="federativeUnit"
					translatedEntity="unidade federativa"
					placeholder="Digite a unidade federativa"
					emptyMessage="Nenhuma unidade federativa encontrada"
					options={federativeUnits}
				/>

				<Button
					type="submit"
					className="mt-2 w-full"
					// disabled={isLoadingCreateMunicipality}
				>
					{/* {isLoadingCreateMunicipality && <LoaderCircle className="animate-spin" />} */}
					Confirmar
				</Button>
			</form>
		</Form>
	);
}
