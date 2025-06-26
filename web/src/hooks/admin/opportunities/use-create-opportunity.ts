import { v4 as uuidv4 } from "uuid";
import { useFieldArray } from "react-hook-form";
import { opportunityRequestSchema } from "@/@schemas/opportunity";
import { useFormMutation } from "@/hooks/common/use-form-mutation";
import { useMutation } from "@tanstack/react-query";
import { createOpportunity } from "@/api/admin/opportunities/create-opportunity";
import { toast } from "sonner";
import { queryClient } from "@/services/react-query";

export function useCreateOpportunity(setIsFormOpen: (open: boolean) => void) {
	const form = useFormMutation({
		schema: opportunityRequestSchema,
		defaultValues: {
			title: "",
			responsibleAgency: "",
			initialDeadline: "",
			finalDeadline: "",
			availableValue: 0,
			minValue: 0,
			maxValue: 0,
			description: "",
			typeId: "",
			requiresCounterpart: false,
			counterpartPercentage: 0,
			projectTypeIds: [],
			requiredDocuments: [],
			documents: [],
		},
		onSubmit: (data) => {
			const processedData = {
				...data,
				requiresCounterpart: data.requiresCounterpart || false,
				counterpartPercentage: data.counterpartPercentage || 0,
				requiredDocuments: (data.requiredDocuments || []).map((doc) => ({
					...doc,
				})),
				documents: (data.documents || []).map((doc) => ({
					...doc,
					id: doc.id || uuidv4(),
					fields: (doc.fields || []).map((field) => ({
						...field,
						value: field.value || "",
						parentId: field.parentId || "",
						id: field.id || uuidv4(),
					})),
				})),
			};

			console.log(processedData);
			createOpportunityFn(processedData);
		},
	});

	const {
		mutateAsync: createOpportunityFn,
		isPending: isLoadingCreateOpportunity,
	} = useMutation({
		mutationKey: ["create-opportunity"],
		mutationFn: createOpportunity,
		onSuccess: (response) => {
			if (response.success) {
				setIsFormOpen(false);
				form.reset();
				queryClient
					.invalidateQueries({
						queryKey: ["get-opportunities"],
					})
					.then(() => {
						toast.success("Oportunidade criada com sucesso");
					});
				return;
			}

			for (const error of response.errors) {
				toast.error(error);
			}
		},
	});

	const {
		fields: requiredDocumentsFields,
		append: appendRequiredDocument,
		remove: removeRequiredDocument,
	} = useFieldArray({
		control: form.control,
		name: "requiredDocuments",
	});

	const {
		fields: documentsFields,
		append: appendDocument,
		remove: removeDocument,
	} = useFieldArray({
		control: form.control,
		name: "documents",
	});

	const addRequiredDocument = () => {
		appendRequiredDocument({
			name: "",
			description: "",
			model: "",
		});
	};

	const addDocument = () => {
		appendDocument({
			id: uuidv4(),
			name: "",
			fields: [],
		});
	};

	const addFieldToDocument = (documentIndex: number) => {
		const currentDocuments = form.getValues("documents") || [];
		const updatedDocuments = [...currentDocuments];
		if (!updatedDocuments[documentIndex].fields) {
			updatedDocuments[documentIndex].fields = [];
		}
		updatedDocuments[documentIndex].fields.push({
			id: uuidv4(),
			name: "",
			value: null,
			parentId: null,
		});
		form.setValue("documents", updatedDocuments);
	};

	const removeFieldFromDocument = (
		documentIndex: number,
		fieldIndex: number
	) => {
		const currentDocuments = form.getValues("documents") || [];
		const updatedDocuments = [...currentDocuments];
		updatedDocuments[documentIndex].fields?.splice(fieldIndex, 1);
		form.setValue("documents", updatedDocuments);
	};

	const getAllFieldsForParentSelection = (
		documentIndex: number,
		currentFieldIndex: number
	) => {
		const documents = form.watch("documents");
		const allFields: Array<{ id: string; name: string; documentName: string }> =
			[];

		documents?.forEach((doc, docIndex) => {
			doc.fields?.forEach((field, fieldIndex) => {
				if (
					!(docIndex === documentIndex && fieldIndex === currentFieldIndex) &&
					field.name &&
					field.id
				) {
					allFields.push({
						id: field.id,
						name: field.name,
						documentName: doc.name || `Documento ${docIndex + 1}`,
					});
				}
			});
		});

		return allFields;
	};

	return {
		form,
		onSubmit: form.handleSubmitForm,
		requiredDocumentsFields,
		documentsFields,
		addRequiredDocument,
		removeRequiredDocument,
		addDocument,
		removeDocument,
		addFieldToDocument,
		removeFieldFromDocument,
		getAllFieldsForParentSelection,
		isLoadingCreateOpportunity,
	};
}
