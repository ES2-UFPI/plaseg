import { describe, it, expect } from "vitest";
import { Role, DomainRole } from "./role";
import { Role as PrismaRole } from "@prisma/client";

describe("Role Value Object", () => {
	describe("static methods", () => {
		it("should create admin role", () => {
			const role = Role.admin();
			expect(role.getValue()).toBe(DomainRole.ADMIN);
			expect(role.toString()).toBe("ADMIN");
		});

		it("should create member role", () => {
			const role = Role.member();
			expect(role.getValue()).toBe(DomainRole.MUNICIPALITY);
			expect(role.toString()).toBe("MUNICIPALITY");
		});
	});

	describe("getValue", () => {
		it("should return the correct domain role value", () => {
			const adminRole = Role.admin();
			const memberRole = Role.member();

			expect(adminRole.getValue()).toBe(DomainRole.ADMIN);
			expect(memberRole.getValue()).toBe(DomainRole.MUNICIPALITY);
		});
	});

	describe("toPrisma", () => {
		it("should convert admin role to Prisma role", () => {
			const role = Role.admin();
			expect(role.toPrisma()).toBe(PrismaRole.ADMIN);
		});

		it("should convert member role to Prisma role", () => {
			const role = Role.member();
			expect(role.toPrisma()).toBe(PrismaRole.MUNICIPALITY);
		});

		it("should throw error for invalid role", () => {
			const role = Role.admin();
			// @ts-expect-error - Testing invalid role
			role.value = "INVALID_ROLE";
			expect(() => role.toPrisma()).toThrow("Invalid role: INVALID_ROLE");
		});
	});

	describe("toString", () => {
		it("should return string representation of the role", () => {
			const adminRole = Role.admin();
			const memberRole = Role.member();

			expect(adminRole.toString()).toBe("ADMIN");
			expect(memberRole.toString()).toBe("MUNICIPALITY");
		});
	});
});
