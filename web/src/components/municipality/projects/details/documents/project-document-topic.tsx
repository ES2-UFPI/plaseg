import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, LoaderCircle, SquarePen } from "lucide-react";
import { useState } from "react";
import { Document } from "@/@schemas/project";
import { ProjectFieldCancelationDialog } from "./project-field-cancelation-dialog";
import { useUpdateDocumentFieldValue } from "@/hooks/municipalities/projects/use-update-document-field-value";

interface ProjectDocumentTopicProps {
	field: Document["fields"][number];
}

export function ProjectDocumentTopic({ field }: ProjectDocumentTopicProps) {
	const [fieldValue, setFieldValue] = useState(field.value);
	const [isEditing, setIsEditing] = useState(false);
	const [isDone, setIsDone] = useState(false);

	const { updateDocumentFieldValueFn, isLoadingUpdateDocumentFieldValue } =
		useUpdateDocumentFieldValue({
			fieldId: field.id,
			onSuccess: () => {
				setIsEditing(false);
				setIsDone(true);
			},
		});

	return (
		<div className={`flex flex-col ${field.value ? "mb-12" : ""}`}>
			<div className="flex items-end justify-between mb-3">
				<div className="flex flex-col gap-6">
					<h2 className="text-xl font-semibold">{field.name}</h2>
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

			{/* {isEditing && (
				<span className="text-xs text-slate-600">
					Em relação a esse tópico o proponente deverá evidenciar a
					compatibilidade entre as atribuições institucionais dos partícipes e o
					objeto proposto. (Realizar conexão com os preceitos constitucionais e
					demais normativos vigentes aplicados ao caso, como por exemplo a Lei
					nº 13.675/2018 (Institui o Sistema Único de Segurança.
				</span>
			)} */}

			{isEditing && (
				<Textarea
					className="bg-white !text-base resize-y h-[150px] mb-4"
					value={fieldValue ?? ""}
					onChange={(e) => setFieldValue(e.target.value)}
				/>
			)}

			{!isEditing && <p className="text-slate-600">{fieldValue}</p>}

			{isEditing && (
				<div className="flex items-center gap-2 self-end">
					<Button variant="outline" onClick={() => setIsEditing(false)}>
						Descartar alterações
					</Button>

					<Button
						variant="outline"
						className="w-[150px] bg-black hover:bg-black/90 text-white hover:text-white outline-none"
						onClick={() => {
							updateDocumentFieldValueFn(fieldValue);
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
		</div>
	);
}
