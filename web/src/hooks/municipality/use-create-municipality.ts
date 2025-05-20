import { createMunicipalityRequestSchema } from "@/@schemas/municipality";
import { useFormMutation } from "../common/use-form-mutation";

export function useCreateMunicipality() {
	const form = useFormMutation({
		schema: createMunicipalityRequestSchema,
		defaultValues: {
			name: "",
			guardInitialDate: new Date(),
			guardCount: 0,
			trafficInitialDate: new Date(),
			trafficCount: 0,
			federativeUnit: "",
			unitType: "",
		},
		onSubmit: async (data) => {
			console.log(data);
		},
	});

	return { form };
}
