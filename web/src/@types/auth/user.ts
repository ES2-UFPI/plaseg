export enum Role {
	ADMIN = "ADMIN",
	ADMIN_MASTER = "ADMIN_MASTER",
	MUNICIPALITY = "MUNICIPALITY",
}

export interface User {
	id: string;
	name: string;
	email: string;
	document: string;
	phone: string;
	password: string;
	allowed: boolean;
	role: Role;
	createdAt: Date;
	updatedAt: Date | null;
}
