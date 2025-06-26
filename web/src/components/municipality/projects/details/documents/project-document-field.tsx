import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, LoaderCircle, Sparkles, SquarePen } from "lucide-react";
import { useState } from "react";
import { ProjectFieldCancelationDialog } from "./project-field-cancelation-dialog";
import { useUpdateDocumentFieldValue } from "@/hooks/municipalities/projects/use-update-document-field-value";
import { useImproveFieldValue } from "@/hooks/municipalities/projects/use-improve-field-value";

interface Field {
	id: string;
	name: string;
	value: string | null;
	fields: Field[] | null;
	order: string;
}

interface ProjectDocumentFieldProps {
	field: Field;
}

export function ProjectDocumentField({ field }: ProjectDocumentFieldProps) {
	const [fieldValue, setFieldValue] = useState(field.value);
	const [isEditing, setIsEditing] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [isImproving, setIsImproving] = useState(false);
	const { improveWithContext } = useImproveFieldValue();

	const { updateDocumentFieldValueFn, isLoadingUpdateDocumentFieldValue } =
		useUpdateDocumentFieldValue({
			fieldId: field.id,
			onSuccess: () => {
				setIsEditing(false);
				setIsDone(true);
			},
		});

	async function handleImproveText() {
		setIsImproving(true);
		try {
			const improved = await improveWithContext(fieldValue ?? "");
			setFieldValue(improved);
		} catch (e) {
			console.log(e);
		} finally {
			setIsImproving(false);
		}
	}

	return (
		<div className={`flex flex-col ${field.value ? "mb-12" : ""}`}>
			<div className="flex items-end justify-between mb-3">
				<div className="flex flex-col gap-6">
					<h2 className="text-xl font-semibold flex gap-2">
						{field.order}.
						<span>{field.name}</span>
					</h2>
				</div>

				<div className="flex items-center gap-2">
					{!isDone && field.value && (
						<>
							{!isEditing && (
								<Button variant="outline" onClick={() => setIsDone(true)}>
									<Check />
									Aceitar sugestão
								</Button>
							)}

							{isEditing && (
								<ProjectFieldCancelationDialog>
									<Button variant="outline">
										<Check />
										Aceitar sugestão
									</Button>
								</ProjectFieldCancelationDialog>
							)}
						</>
					)}

					{field.value && (
						<Button
							variant="outline"
							size="icon"
							onClick={() => setIsEditing(true)}
						>
							<SquarePen />
						</Button>
					)}
				</div>
			</div>

			{isEditing && (
				<Textarea
					className="bg-white !text-base h-[150px] mb-4"
					value={fieldValue ?? ""}
					onChange={(e) => setFieldValue(e.target.value)}
				/>
			)}

			{!isEditing && <p className="text-slate-600">{fieldValue}</p>}

			{isEditing && (
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						className="mr-auto"
						onClick={() => handleImproveText()}
						disabled={isImproving}
					>
						{isImproving && <LoaderCircle className="animate-spin" />}
						{!isImproving && <Sparkles />}
						Gerar nova sugestão
					</Button>

					<Button variant="outline" onClick={() => setIsEditing(false)}>
						Cancelar
					</Button>

					<Button
						variant="outline"
						className="w-[150px] bg-black hover:bg-black/90 text-white hover:text-white outline-none"
						onClick={() => {
							updateDocumentFieldValueFn(fieldValue ?? "");
						}}
						disabled={isLoadingUpdateDocumentFieldValue}
					>
						{isLoadingUpdateDocumentFieldValue && (
							<LoaderCircle className="animate-spin" />
						)}

						{!isLoadingUpdateDocumentFieldValue && "Salvar"}
					</Button>
				</div>
			)}

			{field.fields && field.fields.length > 0 && (
				<div className="flex flex-col gap-4">
					{[...field.fields]
						.sort((a, b) =>
							a.order.localeCompare(b.order, undefined, { numeric: true })
						)
						.map((childField) => (
							<ProjectDocumentField key={childField.id} field={childField} />
						))}
				</div>
			)}
		</div>
	);
}
