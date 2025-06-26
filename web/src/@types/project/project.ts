import type { BaseProduct } from "../admin/base-product";

export type Task = {
	id: string;
	name: string;
	done: boolean;

	createdAt: Date;
	updatedAt: Date | null;
};

export type Field = {
	id: string;
	name: string;
	value: string | null;
	parentId: string | null;
	fields: Field[] | null;

	createdAt: Date;
	updatedAt: Date | null;
};

export type Document = {
	id: string;
	name: string;
	description: string;
	attachedFile: string;

	createdAt: Date;
	updatedAt: Date | null;
};

export type ProjectItem = BaseProduct & {
	quantity: number;
};

export type Project = {
	id: string;
	title: string;

	responsibleCpf: string;
	responsibleName: string;
	responsibleEmail: string;
	responsiblePhone: string;

	totalValue: number;
	baseValue: number;
	requestedValue: number;

	counterpartCapitalItem: string;
	counterpartCapitalValue: number;

	counterpartOperatingCostCode: string;
	counterpartOperatingCostValue: number;

	counterpartDescription: string;
	counterpartAttachedFile: string;

	tasks: Task[];
	fields: Field[];
	documents: Document[];
	items: ProjectItem[];

	createdAt: Date;
	updatedAt: Date | null;
};
