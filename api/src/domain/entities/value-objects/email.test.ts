import { describe, it, expect } from "vitest";
import { Email } from "./email";

describe("Email Value Object", () => {
	describe("create", () => {
		it("should create a valid email", () => {
			const email = Email.create("test@example.com");
			expect(email.toString()).toBe("test@example.com");
		});

		it("should throw error for invalid email format", () => {
			expect(() => Email.create("invalid-email")).toThrow(
				"Invalid email format"
			);
			expect(() => Email.create("test@")).toThrow("Invalid email format");
			expect(() => Email.create("@example.com")).toThrow(
				"Invalid email format"
			);
			expect(() => Email.create("test@example")).toThrow(
				"Invalid email format"
			);
		});
	});

	describe("isValid", () => {
		it("should return true for valid email formats", () => {
			expect(Email.isValid("test@example.com")).toBeTruthy();
			expect(Email.isValid("user.name@domain.com")).toBeTruthy();
			expect(Email.isValid("user+tag@example.com")).toBeTruthy();
		});

		it("should return false for invalid email formats", () => {
			expect(Email.isValid("invalid-email")).toBe(false);
			expect(Email.isValid("test@")).toBe(false);
			expect(Email.isValid("@example.com")).toBe(false);
			expect(Email.isValid("test@example")).toBe(false);
			expect(Email.isValid("")).toBe(false);
			expect(Email.isValid(" ")).toBe(false);
		});
	});

	describe("toString", () => {
		it("should return the email string value", () => {
			const email = Email.create("test@example.com");
			expect(email.toString()).toBe("test@example.com");
		});
	});
});
