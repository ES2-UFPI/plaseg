import { TypeGroup as PrismaTypeGroup } from "@prisma/client";

export enum DomainTypeGroup {
	SERVICE = "SERVICE",
	OPPORTUNITY = "OPPORTUNITY",
	CATEGORY = "CATEGORY",
}

export class TypeGroup {
	private readonly value: DomainTypeGroup;

	private constructor(typeGroup: DomainTypeGroup) {
		this.value = typeGroup;
	}

	public getValue(): DomainTypeGroup {
		return this.value;
	}

	public toPrisma(): PrismaTypeGroup {
		switch (this.value) {
			case DomainTypeGroup.SERVICE:
				return PrismaTypeGroup.SERVICE;
			case DomainTypeGroup.CATEGORY:
				return PrismaTypeGroup.CATEGORY;
			case DomainTypeGroup.OPPORTUNITY:
				return PrismaTypeGroup.OPPORTUNITY;
			default:
				throw new Error(`Invalid type group: ${this.value}`);
		}
	}

	static create(value: string): TypeGroup {
		if (
			value === DomainTypeGroup.SERVICE ||
			value === DomainTypeGroup.CATEGORY ||
			value === DomainTypeGroup.OPPORTUNITY
		) {
			return new TypeGroup(value);
		}

		throw new Error("Invalid type group.");
	}

	public static service(): TypeGroup {
		return new TypeGroup(DomainTypeGroup.SERVICE);
	}

	public static category(): TypeGroup {
		return new TypeGroup(DomainTypeGroup.CATEGORY);
	}

	public static opportunity(): TypeGroup {
		return new TypeGroup(DomainTypeGroup.OPPORTUNITY);
	}

	public toString(): string {
		return this.value;
	}
}
