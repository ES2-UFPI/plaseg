export interface RequiredDocument {
	id: string;
	name: string;
	description: string;
	model: string;

	createdAt: Date;
	updatedAt: Date | null;
}
