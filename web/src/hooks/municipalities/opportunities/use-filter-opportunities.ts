import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { z } from "zod";

const filterOpportunitiesSchema = z.object({
	title: z.string(),
	order: z.string(),
	category: z.string(),
	area: z.string(),
	minProjectValue: z.number(),
	maxProjectValue: z.number(),
	initialDate: z.date(),
	finalDate: z.date(),
});

export function useFilterOpportunities() {
	const form = useFormMutation({
		schema: filterOpportunitiesSchema,
		defaultValues: {
			title: "",
			order: "",
			category: "",
			area: "",
			minProjectValue: undefined,
			maxProjectValue: undefined,
			initialDate: undefined,
			finalDate: undefined,
		},
		onSubmit: (data) => {
			console.log(data);
		},
	});

	return {
		form,
	};
}
