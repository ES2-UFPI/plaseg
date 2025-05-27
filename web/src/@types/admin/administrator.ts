export interface Administrator {
	id: string;
	name: string;
	email: string;
	phone: string;
	document: string;
	role: string;
	createdAt: Date;
	updatedAt: Date | null;
}
