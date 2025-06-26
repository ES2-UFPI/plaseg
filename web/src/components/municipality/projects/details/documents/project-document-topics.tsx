import { CircleProgressIcon } from "@/components/ui/circle-progress-icon";
import { Document } from "@/@schemas/project";
import { nestFields } from "@/utils/nested-fields";

interface ProjectDocumentTopicsProps {
	document: Document;
}

export function ProjectDocumentTopics({
	document,
}: ProjectDocumentTopicsProps) {
	const nestedFields = nestFields(document.fields);

	const fieldsWithoutValue = document.fields.filter(
		(field) => field.value !== ""
	);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Tópicos</h2>

				<span className="text-muted-foreground text-sm">
					3 de {fieldsWithoutValue.length} concluídos
				</span>
			</div>

			<div className="flex flex-col gap-6">
				{nestedFields.map((field) => (
					<div key={field.id} className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							{field.value && (
								<div className="w-4 h-4">
									<CircleProgressIcon percentage={100} size={16} />
								</div>
							)}

							<span
								className={`text-sm flex gap-2 font-medium ${
									field.value ? "" : "text-muted-foreground"
								}`}
							>
								{field.order}.
								<span>{field.name}</span>
							</span>
						</div>

						{field.fields && (
							<div className="flex flex-col gap-2">
								{field.fields.map((nestedField) => (
									<div key={nestedField.id} className="flex items-center gap-2">
										{nestedField.value && (
											<div className="w-4 h-4">
												<CircleProgressIcon percentage={100} size={16} />
											</div>
										)}

										<span
											className={`text-sm flex gap-2 font-medium ${
												nestedField.value ? "" : "text-muted-foreground"
											}`}
										>
											{nestedField.order}.
											<span>{nestedField.name}</span>
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
