import { Either, right, left } from "./either";
import { test, expect } from "vitest";

function doSomeThing(shouldSuccess: boolean): Either<string, number> {
	if (shouldSuccess) {
		return right(10);
	} else {
		return left("error");
	}
}

test("success result", () => {
	const result = doSomeThing(true);

	expect(result.isRight()).toBeTruthy();
	expect(result.isLeft()).toBe(false);
});

test("error result", () => {
	const result = doSomeThing(false);

	expect(result.isLeft()).toBeTruthy();
	expect(result.isRight()).toBe(false);
});
