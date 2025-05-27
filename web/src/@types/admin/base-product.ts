export interface BaseProduct {
	id: string;
	code: string;
	name: string;
	technicalDescription: string;

	typeId: string;
	category: string;

	budget1: number;
	budget1Validity: Date;
	budget2: number;
	budget2Validity: Date;
	budget3: number;
	budget3Validity: Date;
	unitValue: number;

	createdAt: Date;
	updatedAt: Date | null;
}
