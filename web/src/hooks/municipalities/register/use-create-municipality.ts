import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useFieldArray } from "react-hook-form";
import {
	municipalityFormSchema,
	type CreateMunicipalityRequest,
} from "@/@schemas/municipality-schema";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createMunicipality } from "@/api/municipality/create-municipality";
import { useNavigate } from "react-router";
import { useFormMutation } from "@/hooks/common/use-form-mutation";

interface CreateMunicipalityStore {
	currentStep: number;
	formData: Partial<CreateMunicipalityRequest>;
	setCurrentStep: (step: number) => void;
	updateFormData: (data: Partial<CreateMunicipalityRequest>) => void;
	resetForm: () => void;
}

const initialFormData: Partial<CreateMunicipalityRequest> = {
	name: "",
	guardCount: 0,
	trafficCount: 0,
	federativeUnit: "",
	unitType: "MUNICIPIO",
	qualifiedStaff: [
		{
			name: "",
			sector: "",
			education: "",
			experience: "",
			employmentType: "CLT",
			document: "",
			isResponsible: false,
		},
	],
	projectsPartnerships: [],
	allocationDepartments: [],
	managements: [
		{
			initialDate: new Date(),
			endDate: new Date(),
			managerName: "",
			managerCpf: "",
			managerEmail: "",
			managerAddress: "",
			managerPhone: "",
			adminManagerName: "",
			adminManagerCpf: "",
			adminManagerEmail: "",
			adminManagerAddress: "",
			adminManagerPhone: "",
			legislationName: "",
			legislationCpf: "",
			legislationEmail: "",
			legislationAddress: "",
			legislationPhone: "",
		},
	],
	maintenanceContracts: [],
};

const useCreateMunicipalityForm = create<CreateMunicipalityStore>()(
	persist(
		(set) => ({
			currentStep: 0,
			formData: initialFormData,
			setCurrentStep: (step) => set({ currentStep: step }),
			updateFormData: (data) =>
				set((state) => ({
					formData: { ...state.formData, ...data },
				})),
			resetForm: () =>
				set({
					currentStep: 0,
					formData: initialFormData,
				}),
		}),
		{
			name: "municipality-form-storage",
			partialize: (state) => ({
				currentStep: state.currentStep,
				formData: state.formData,
			}),
		}
	)
);

export function useCreateMunicipality() {
	const navigate = useNavigate();

	const { currentStep, formData, setCurrentStep, updateFormData } =
		useCreateMunicipalityForm();

	const form = useFormMutation<CreateMunicipalityRequest>({
		schema: municipalityFormSchema,
		defaultValues: {
			name: formData.name || "",
			guardInitialDate: formData.guardInitialDate || new Date(),
			guardCount: formData.guardCount || 0,
			trafficInitialDate: formData.trafficInitialDate || new Date(),
			trafficCount: formData.trafficCount || 0,
			federativeUnit: formData.federativeUnit || "",
			unitType: formData.unitType || "MUNICIPIO",
			qualifiedStaff: formData.qualifiedStaff || initialFormData.qualifiedStaff,
			projectsPartnerships: formData.projectsPartnerships || [],
			allocationDepartments: formData.allocationDepartments || [],
			managements: formData.managements || initialFormData.managements,
			maintenanceContracts: formData.maintenanceContracts || [],
		},
		onSubmit: (data) => {
			createMunicipalityFn(data);
		},
	});

	const staffFieldArray = useFieldArray({
		control: form.control,
		name: "qualifiedStaff",
	});

	const projectsFieldArray = useFieldArray({
		control: form.control,
		name: "projectsPartnerships",
	});

	const departmentsFieldArray = useFieldArray({
		control: form.control,
		name: "allocationDepartments",
	});

	const managementFieldArray = useFieldArray({
		control: form.control,
		name: "managements",
	});

	const contractsFieldArray = useFieldArray({
		control: form.control,
		name: "maintenanceContracts",
	});

	const getStepFields = (step: number): (keyof CreateMunicipalityRequest)[] => {
		switch (step) {
			case 0:
				return [
					"name",
					"guardInitialDate",
					"guardCount",
					"trafficInitialDate",
					"trafficCount",
					"federativeUnit",
					"unitType",
				];
			case 1:
				return ["qualifiedStaff"];
			case 2:
				return ["projectsPartnerships"];
			case 3:
				return ["allocationDepartments"];
			case 4:
				return ["managements"];
			case 5:
				return ["maintenanceContracts"];
			default:
				return [];
		}
	};

	const validateCurrentStep = async () => {
		const stepFields = getStepFields(currentStep);
		const isValid = await form.trigger(stepFields);
		return isValid;
	};

	const handleNext = async () => {
		const isValid = await validateCurrentStep();

		if (isValid) {
			const currentFormData = form.getValues();
			updateFormData(currentFormData);

			if (currentStep < 5) {
				setCurrentStep(currentStep + 1);
			}
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			const currentFormData = form.getValues();
			updateFormData(currentFormData);
			setCurrentStep(currentStep - 1);
		}
	};

	const {
		mutateAsync: createMunicipalityFn,
		isPending: isLoadingCreateMunicipality,
	} = useMutation({
		mutationKey: ["create-municipality"],
		mutationFn: createMunicipality,
		onSuccess(response) {
			if (response.success) {
				form.reset();
				navigate("/oportunidades");
				return;
			}

			for (const error of response.errors) {
				toast.error(error);
			}
		},
	});

	return {
		form,
		currentStep,
		isLoadingCreateMunicipality,
		staffFieldArray,
		projectsFieldArray,
		departmentsFieldArray,
		managementFieldArray,
		contractsFieldArray,
		handleNext,
		handlePrevious,
		validateCurrentStep,
		getStepFields,
	};
}
