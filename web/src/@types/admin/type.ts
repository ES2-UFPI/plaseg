export enum TypeGroup {
	OPPORTUNITY = "OPPORTUNITY",
	SERVICE = "SERVICE",
	CATEGORY = "CATEGORY",
}

export interface Type {
	id: string;
	description: string;
	group: TypeGroup;
	parent: string | null;

	createdAt: Date;
	updatedAt: Date | null;
}
