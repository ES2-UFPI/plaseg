import { compare, hash } from "bcrypt";
import type { HashComparer } from "../../domain/cryptography/hash-comparer";
import type { HashGenerator } from "../../domain/cryptography/hash-generator";

export class BcryptAdapter implements HashComparer, HashGenerator {
	constructor(private readonly salt: number) {}

	async compare(plain: string, hash: string): Promise<boolean> {
		return compare(plain, hash);
	}

	async hash(plain: string): Promise<string> {
		return hash(plain, this.salt);
	}
}
