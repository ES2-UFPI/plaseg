import { describe, it, expect } from "vitest";
import { EmploymentType, DomainEmploymentType } from "./employment-type";
import { EmploymentType as PrismaEmploymentType } from "@prisma/client";

describe("EmploymentType Value Object", () => {
	describe("static methods", () => {
		it("should create CLT employment type", () => {
			const employmentType = EmploymentType.clt();
			expect(employmentType.getValue()).toBe(DomainEmploymentType.CLT);
			expect(employmentType.toString()).toBe("CLT");
		});

		it("should create PJ employment type", () => {
			const employmentType = EmploymentType.pj();
			expect(employmentType.getValue()).toBe(DomainEmploymentType.PJ);
			expect(employmentType.toString()).toBe("PJ");
		});

		it("should create OTHERS employment type", () => {
			const employmentType = EmploymentType.others();
			expect(employmentType.getValue()).toBe(DomainEmploymentType.OTHERS);
			expect(employmentType.toString()).toBe("OTHERS");
		});
	});

	describe("getValue", () => {
		it("should return the correct domain employment type value", () => {
			const cltType = EmploymentType.clt();
			const pjType = EmploymentType.pj();
			const othersType = EmploymentType.others();

			expect(cltType.getValue()).toBe(DomainEmploymentType.CLT);
			expect(pjType.getValue()).toBe(DomainEmploymentType.PJ);
			expect(othersType.getValue()).toBe(DomainEmploymentType.OTHERS);
		});
	});

	describe("toPrisma", () => {
		it("should convert CLT employment type to Prisma employment type", () => {
			const employmentType = EmploymentType.clt();
			expect(employmentType.toPrisma()).toBe(PrismaEmploymentType.CLT);
		});

		it("should convert PJ employment type to Prisma employment type", () => {
			const employmentType = EmploymentType.pj();
			expect(employmentType.toPrisma()).toBe(PrismaEmploymentType.PJ);
		});

		it("should convert OTHERS employment type to Prisma employment type", () => {
			const employmentType = EmploymentType.others();
			expect(employmentType.toPrisma()).toBe(PrismaEmploymentType.OTHERS);
		});

		it("should throw error for invalid employment type", () => {
			const employmentType = EmploymentType.clt();
			// @ts-expect-error - Testing invalid employment type
			employmentType["value"] = "INVALID_EMPLOYMENT_TYPE";
			expect(() => employmentType.toPrisma()).toThrow(
				"Invalid employment type: INVALID_EMPLOYMENT_TYPE"
			);
		});
	});

	describe("toString", () => {
		it("should return string representation of the employment type", () => {
			const cltType = EmploymentType.clt();
			const pjType = EmploymentType.pj();
			const othersType = EmploymentType.others();

			expect(cltType.toString()).toBe("CLT");
			expect(pjType.toString()).toBe("PJ");
			expect(othersType.toString()).toBe("OTHERS");
		});
	});
});
