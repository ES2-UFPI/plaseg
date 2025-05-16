export class Email {
	private value: string;

	private constructor(value: string) {
		this.value = value;
	}

	toString(): string {
		return this.value;
	}

	static create(value: string): Email {
		if (!Email.isValid(value)) {
			throw new Error("Invalid email format");
		}
		return new Email(value);
	}

	static isValid(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}
