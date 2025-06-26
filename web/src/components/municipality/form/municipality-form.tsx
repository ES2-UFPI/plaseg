import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { useCreateMunicipality } from "@/hooks/municipalities/register/use-create-municipality";
import { StepIndicator } from "./steps-indicator";
import { GeneralDataStep } from "./steps/general-data-step";
import { QualifiedStaffStep } from "./steps/qualified-staff-step";
import { ProjectsPartnershipsStep } from "./steps/projects-partnerships-step";
import { AllocationDepartmentsStep } from "./steps/allocation-department-step";
import { MaintenanceContractsStep } from "./steps/maintenance-contracts-step";
import { ManagementStep } from "./steps/management-step";

const TOTAL_STEPS = 6;

export function MunicipalityForm() {
	const {
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
	} = useCreateMunicipality();

	const renderCurrentStep = () => {
		switch (currentStep) {
			case 0:
				return <GeneralDataStep form={form} />;
			case 1:
				return (
					<QualifiedStaffStep form={form} staffFieldArray={staffFieldArray} />
				);
			case 2:
				return (
					<ProjectsPartnershipsStep
						form={form}
						projectsFieldArray={projectsFieldArray}
					/>
				);
			case 3:
				return (
					<AllocationDepartmentsStep
						form={form}
						departmentsFieldArray={departmentsFieldArray}
					/>
				);
			case 4:
				return (
					<ManagementStep
						form={form}
						managementFieldArray={managementFieldArray}
					/>
				);
			case 5:
				return (
					<MaintenanceContractsStep
						form={form}
						contractsFieldArray={contractsFieldArray}
					/>
				);
			default:
				return null;
		}
	};

	const isLastStep = currentStep === TOTAL_STEPS - 1;

	return (
		<div className="min-h-screen grid grid-cols-3">
			<StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

			<div className="col-span-2 flex	max-h-screen overflow-y-auto p-24">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmitForm}
						className="w-[700px] mx-auto m-0 space-y-8"
					>
						{renderCurrentStep()}

						<div className="flex justify-between pt-6 border-t pb-24">
							<Button
								type="button"
								variant="outline"
								onClick={handlePrevious}
								disabled={currentStep === 0}
							>
								<ArrowLeft className="w-4 h-4 mr-2" />
								Anterior
							</Button>

							{isLastStep && (
								<Button
									type="submit"
									disabled={isLoadingCreateMunicipality}
									className="bg-blue-600 hover:bg-blue-700 w-[150px]"
								>
									{isLoadingCreateMunicipality && (
										<LoaderCircle className="animate-spin" />
									)}

									{!isLoadingCreateMunicipality && "Finalizar Cadastro"}
								</Button>
							)}

							{!isLastStep && (
								<Button
									type="button"
									onClick={handleNext}
									className="bg-blue-600 hover:bg-blue-700"
								>
									Próximo
									<ArrowRight className="w-4 h-4 ml-2" />
								</Button>
							)}
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
