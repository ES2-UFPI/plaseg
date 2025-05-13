import { Optional } from "./optional";
import { test, expect } from "vitest";

// Example type to test Optional
type User = {
	id: string;
	name: string;
	email: string;
	age: number;
};

// Function that uses Optional type
function createUser(user: Optional<User, "id" | "age">): User {
	return {
		id: user.id ?? "default-id",
		name: user.name,
		email: user.email,
		age: user.age ?? 0,
	};
}

test("should create user with optional id and age", () => {
	const userData = {
		name: "John Doe",
		email: "john@example.com",
	};

	const user = createUser(userData);

	expect(user).toEqual({
		id: "default-id",
		name: "John Doe",
		email: "john@example.com",
		age: 0,
	});
});

test("should create user with all fields provided", () => {
	const userData = {
		id: "123",
		name: "John Doe",
		email: "john@example.com",
		age: 25,
	};

	const user = createUser(userData);

	expect(user).toEqual({
		id: "123",
		name: "John Doe",
		email: "john@example.com",
		age: 25,
	});
});
