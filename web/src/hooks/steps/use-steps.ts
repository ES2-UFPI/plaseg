import { create } from "zustand";

interface Step {
	title: string;
	status: "completed" | "progress" | "pending";
}

interface StepsStore {
	steps: Step[];
	userType: "municipio" | "empresa";
	setUserType: (type: "municipio" | "empresa") => void;
	stepForward: () => void;
	stepBack: () => void;
	currentStep: () => number;
}

const stepsData: Step[] = [
	{ title: "Informações Cadastrais da Empresa", status: "progress" },
	{ title: "Endereço da Empresa", status: "pending" },
	{ title: "Redes Sociais", status: "pending" },
	{ title: "Informações do Representante Legal", status: "pending" },
	{ title: "Informações Comerciais", status: "pending" },
	{ title: "Documentação Obrigatória", status: "pending" },
	{ title: "Certificações e Qualificações", status: "pending" },
];

const stepsDataMunicipio: Step[] = [
	{ title: "Dados Gerais do Município", status: "progress" },
	{ title: "Equipe Qualificada", status: "pending" },
	{ title: "Projetos anteriores", status: "pending" },
	{ title: "Setores de Alocações de Bens", status: "pending" },
	{ title: "Responsáveis pela gestão", status: "pending" },
	{ title: "Contratos de manutenção", status: "pending" },
];

export const useStepsStore = create<StepsStore>((set, get) => ({
	steps: stepsData,
	userType: "empresa",

	setUserType: (type) =>
		set(() => {
			return {
				userType: type,
				steps: type === "municipio" ? stepsDataMunicipio : stepsData,
			};
		}),

	stepForward: () =>
		set((state) => {
			const currentIndex = state.steps.findIndex(
				(step) => step.status === "progress"
			);

			if (currentIndex === -1 || currentIndex === state.steps.length - 1)
				return state;

			const newSteps = [...state.steps];
			newSteps[currentIndex].status = "completed";
			newSteps[currentIndex + 1].status = "progress";

			return { steps: newSteps };
		}),

	stepBack: () =>
		set((state) => {
			const currentIndex = state.steps.findIndex(
				(step) => step.status === "progress"
			);
			if (currentIndex <= 0) return state;

			const newSteps = [...state.steps];
			newSteps[currentIndex].status = "pending";
			newSteps[currentIndex - 1].status = "progress";

			return { steps: newSteps };
		}),

	currentStep: () => {
		return get().steps.findIndex((step) => step.status === "progress") + 1;
	},
}));
