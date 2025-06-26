import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { LoaderCircle } from "lucide-react";
import { FormSelect } from "@/components/form/form-select";
import { TypeGroup } from "@/@types/admin/type";
import { useGetTypes } from "@/hooks/admin/types/use-get-types";
import { useState } from "react";
import { SetHasParentCheckbox } from "./set-has-parent-checkbox";
import { UseFormReturn } from "react-hook-form";
import { CreateTypeRequest } from "@/@schemas/type";

interface TypeFormProps {
	form: UseFormReturn<CreateTypeRequest> & {
		handleSubmitForm: () => void;
	};
	setIsFormOpen: (open: boolean) => void;
	isLoading: boolean;
}

export function TypeForm({ setIsFormOpen, form, isLoading }: TypeFormProps) {
	const [hasParent, setHasParent] = useState(
		form.watch("parentId") !== undefined
	);

	const { types } = useGetTypes({
		group: TypeGroup.CATEGORY,
	});

	const typeGroupOptions = [
		{ label: "Oportunidade", value: TypeGroup.OPPORTUNITY },
		{ label: "Serviço", value: TypeGroup.SERVICE },
		{ label: "Categoria", value: TypeGroup.CATEGORY },
	];

	const parentOptions = types
		.filter((type) => type.group === TypeGroup.CATEGORY)
		.map((type) => ({
			label: type.description,
			value: type.id,
		}));

	const isButtonDisabled = hasParent && !form.watch("parentId");

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmitForm}
				className="flex-1 flex flex-col justify-between"
			>
				<div className="flex flex-col gap-4">
					<FormInput
						form={form}
						entity="description"
						label="Nome"
						placeholder="Digite o nome do tipo"
					/>

					<FormSelect
						form={form}
						entity="group"
						label="Grupo"
						placeholder="Selecione o grupo"
						options={typeGroupOptions}
					/>

					{form.watch("group") === TypeGroup.CATEGORY && (
						<>
							<SetHasParentCheckbox
								hasParent={hasParent}
								setHasParent={setHasParent}
							/>

							{hasParent === true && (
								<FormSelect
									form={form}
									entity="parentId"
									label="Tipo Pai"
									placeholder="Selecione o tipo pai"
									options={parentOptions}
								/>
							)}
						</>
					)}
				</div>

				<div className="flex justify-end gap-2">
					<Button
						type="button"
						className="w-full max-w-[170px]"
						variant="outline"
						onClick={() => setIsFormOpen(false)}
					>
						Cancelar
					</Button>

					<Button
						className="w-full max-w-[170px]"
						type="submit"
						disabled={isLoading || isButtonDisabled}
					>
						{isLoading && <LoaderCircle className="mr-2 animate-spin" />}
						{!isLoading && "Salvar"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
