import { describe, it, expect } from "vitest";
import { UnitType, DomainUnitType } from "./unit-type";
import { UnitType as PrismaUnitType } from "@prisma/client";

describe("UnitType Value Object", () => {
	describe("static methods", () => {
		it("should create UF unit type", () => {
			const unitType = UnitType.uf();
			expect(unitType.getValue()).toBe(DomainUnitType.UF);
			expect(unitType.toString()).toBe("UF");
		});

		it("should create Municipality unit type", () => {
			const unitType = UnitType.municipality();
			expect(unitType.getValue()).toBe(DomainUnitType.MUNICIPALITY);
			expect(unitType.toString()).toBe("MUNICIPALITY");
		});
	});

	describe("getValue", () => {
		it("should return the correct domain unit type value", () => {
			const ufUnitType = UnitType.uf();
			const municipalityUnitType = UnitType.municipality();

			expect(ufUnitType.getValue()).toBe(DomainUnitType.UF);
			expect(municipalityUnitType.getValue()).toBe(DomainUnitType.MUNICIPALITY);
		});
	});

	describe("toPrisma", () => {
		it("should convert UF unit type to Prisma unit type", () => {
			const unitType = UnitType.uf();
			expect(unitType.toPrisma()).toBe(PrismaUnitType.UF);
		});

		it("should convert Municipality unit type to Prisma unit type", () => {
			const unitType = UnitType.municipality();
			expect(unitType.toPrisma()).toBe(PrismaUnitType.MUNICIPALITY);
		});

		it("should throw error for invalid unit type", () => {
			const unitType = UnitType.uf();
			// @ts-expect-error - Testing invalid unit type
			unitType["value"] = "INVALID_UNIT_TYPE";
			expect(() => unitType.toPrisma()).toThrow(
				"Invalid unit type: INVALID_UNIT_TYPE"
			);
		});
	});

	describe("toString", () => {
		it("should return string representation of the unit type", () => {
			const ufUnitType = UnitType.uf();
			const municipalityUnitType = UnitType.municipality();

			expect(ufUnitType.toString()).toBe("UF");
			expect(municipalityUnitType.toString()).toBe("MUNICIPALITY");
		});
	});
});
