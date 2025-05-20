import { Role as PrismaRole } from "@prisma/client";

export enum DomainRole {
	ADMIN = "ADMIN",
	MUNICIPALITY = "MUNICIPALITY",
	COMPANY = "COMPANY",
	ADMIN_MASTER = "ADMIN_MASTER",
}

export type RoleType = "ADMIN" | "MUNICIPALITY" | "COMPANY" | "ADMIN_MASTER";

export class Role {
	private readonly value: DomainRole;

	private constructor(role: DomainRole) {
		this.value = role;
	}

	public getValue(): DomainRole {
		return this.value;
	}

	public toPrisma(): PrismaRole {
		switch (this.value) {
			case DomainRole.ADMIN:
				return PrismaRole.ADMIN;
			case DomainRole.MUNICIPALITY:
				return PrismaRole.MUNICIPALITY;
			case DomainRole.ADMIN_MASTER:
				return PrismaRole.ADMIN_MASTER;
			default:
				throw new Error(`Invalid role: ${this.value}`);
		}
	}

	public static admin(): Role {
		return new Role(DomainRole.ADMIN);
	}

	public static member(): Role {
		return new Role(DomainRole.MUNICIPALITY);
	}

	public static company(): Role {
		return new Role(DomainRole.COMPANY);
	}

	public static adminMaster(): Role {
		return new Role(DomainRole.ADMIN_MASTER);
	}

	public toString(): string {
		return this.value;
	}

	public static fromString(role: string): Role {
		switch (role) {
			case DomainRole.ADMIN:
				return Role.admin();
			case DomainRole.MUNICIPALITY:
				return Role.member();
			case DomainRole.COMPANY:
				return Role.company();
			case DomainRole.ADMIN_MASTER:
				return Role.adminMaster();
			default:
				throw new Error(`Invalid role: ${role}`);
		}
	}
}
