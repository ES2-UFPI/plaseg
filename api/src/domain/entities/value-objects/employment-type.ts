import { EmploymentType as PrismaEmploymentType } from "@prisma/client";

export enum DomainEmploymentType {
	CLT = "CLT",
	PJ = "PJ",
	OTHERS = "OTHERS",
}

export class EmploymentType {
	private readonly value: DomainEmploymentType;

	private constructor(employmentType: DomainEmploymentType) {
		this.value = employmentType;
	}

	public getValue(): DomainEmploymentType {
		return this.value;
	}

	public toPrisma(): PrismaEmploymentType {
		switch (this.value) {
			case DomainEmploymentType.CLT:
				return PrismaEmploymentType.CLT;
			case DomainEmploymentType.PJ:
				return PrismaEmploymentType.PJ;
			case DomainEmploymentType.OTHERS:
				return PrismaEmploymentType.OTHERS;
			default:
				throw new Error(`Invalid employment type: ${this.value}`);
		}
	}

	static create(value: string): EmploymentType {
		if (
			value === DomainEmploymentType.CLT ||
			value === DomainEmploymentType.PJ ||
			value === DomainEmploymentType.OTHERS
		) {
			return new EmploymentType(value);
		}

		throw new Error("Invalid employment type.");
	}

	public static clt(): EmploymentType {
		return new EmploymentType(DomainEmploymentType.CLT);
	}

	public static pj(): EmploymentType {
		return new EmploymentType(DomainEmploymentType.PJ);
	}

	public static others(): EmploymentType {
		return new EmploymentType(DomainEmploymentType.OTHERS);
	}

	public toString(): string {
		return this.value;
	}
}
