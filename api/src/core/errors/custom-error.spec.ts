import { describe, it, expect } from "vitest";
import { CustomError } from "./custom-error";

describe("CustomError", () => {
	it("should create an instance with a single string message", () => {
		const error = new CustomError(404, "Not Found");

		expect(error).toBeInstanceOf(CustomError);
		expect(error).toBeInstanceOf(Error);
		expect(error.statusCode).toBe(404);
		expect(error.name).toBe("CustomError");
		expect(error.errors).toEqual(["Not Found"]);
		expect(error.message).toBe("Not Found");
	});

	it("should create an instance with an array of string messages", () => {
		const errorMessages = ["Resource not found", "Invalid ID"];
		const error = new CustomError(400, errorMessages);

		expect(error).toBeInstanceOf(CustomError);
		expect(error).toBeInstanceOf(Error);
		expect(error.statusCode).toBe(400);
		expect(error.name).toBe("CustomError");
		expect(error.errors).toEqual(errorMessages);
		expect(error.message).toBe("Resource not found");
	});

	it("should correctly set statusCode and convert single message to array", () => {
		const error = new CustomError(500, "Internal Server Error");

		expect(error.statusCode).toBe(500);
		expect(error.errors).toHaveLength(1);
		expect(error.errors[0]).toBe("Internal Server Error");
	});

	it("should handle multiple errors without modifying the original array", () => {
		const originalErrors = ["Error 1", "Error 2"];
		const error = new CustomError(409, originalErrors);

		expect(error.errors).toEqual(originalErrors);
		expect(error.errors).toHaveLength(2);
	});

	it("should inherit from Error prototype", () => {
		const error = new CustomError(401, "Unauthorized");

		expect(error instanceof Error).toBeTruthy();
		expect(error.stack).toBeDefined();
	});
});
