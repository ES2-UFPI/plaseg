import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { CreateProjectTypeRequest } from "@/@schemas/project-type";

interface ProjectTypeFormProps {
	form: UseFormReturn<CreateProjectTypeRequest> & {
		handleSubmitForm: () => void;
	};
	setIsFormOpen: (open: boolean) => void;
	isLoading: boolean;
}

export function ProjectTypeForm({
	form,
	isLoading,
	setIsFormOpen,
}: ProjectTypeFormProps) {
	const {
		fields: documentsFields,
		append: appendDocument,
		remove: removeDocument,
	} = useFieldArray({
		control: form.control,
		name: "documents",
	});

	const addDocument = () => {
		appendDocument({
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
			name: "",
			value: null,
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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmitForm}
				className="space-y-6 flex flex-col justify-between h-full"
			>
				<div className="space-y-4">
					<FormInput
						form={form}
						entity="name"
						label="Nome"
						placeholder="Digite o nome do tipo de projeto"
					/>

					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold">Documentos</h3>
						<Button
							type="button"
							onClick={addDocument}
							size="sm"
							className="flex items-center gap-2"
						>
							<Plus className="h-4 w-4" />
							Adicionar Documento
						</Button>
					</div>

					{documentsFields.map((docField, docIndex) => (
						<Card key={docField.id} className="shadow-none">
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<CardTitle className="text-sm">
										Documento {docIndex + 1}
									</CardTitle>

									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => removeDocument(docIndex)}
										className="text-red-500 hover:text-red-700"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</CardHeader>

							<CardContent className="space-y-4">
								<FormInput
									form={form}
									entity={`documents.${docIndex}.name`}
									label="Nome do Documento"
									placeholder="Digite o nome do documento"
								/>

								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<h4 className="text-sm font-medium">Campos</h4>
										<Button
											type="button"
											onClick={() => addFieldToDocument(docIndex)}
											size="sm"
											variant="outline"
											className="flex items-center gap-2"
										>
											<Plus className="h-3 w-3" />
											Adicionar Campo
										</Button>
									</div>

									{form
										.watch(`documents.${docIndex}.fields`)
										?.map((_, fieldIndex) => (
											<div
												key={fieldIndex}
												className="border rounded-lg p-4 space-y-3 bg-muted/50"
											>
												<div className="flex items-center justify-between">
													<span className="text-xs font-medium text-muted-foreground">
														Campo {fieldIndex + 1}
													</span>

													<Button
														type="button"
														variant="ghost"
														size="sm"
														onClick={() =>
															removeFieldFromDocument(docIndex, fieldIndex)
														}
														className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
													>
														<Trash2 className="h-3 w-3" />
													</Button>
												</div>

												<FormInput
													form={form}
													entity={`documents.${docIndex}.fields.${fieldIndex}.name`}
													label="Nome do Campo"
													placeholder="Digite o nome do campo"
													inputClassName="bg-white"
												/>

												<FormTextarea
													form={form}
													entity={`documents.${docIndex}.fields.${fieldIndex}.value`}
													label="Valor (Opcional)"
													placeholder="Digite o valor do campo"
													textAreaClassName="bg-white"
												/>
											</div>
										))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="flex justify-end gap-3">
					<Button
						type="button"
						variant="outline"
						className="w-[150px]"
						onClick={() => setIsFormOpen(false)}
						disabled={isLoading}
					>
						Cancelar
					</Button>

					<Button
						type="submit"
						className="w-[150px]"
						disabled={isLoading}
					>
						{isLoading && (
							<LoaderCircle className="animate-spin" />
						)}
						Confirmar
					</Button>
				</div>
			</form>
		</Form>
	);
}
