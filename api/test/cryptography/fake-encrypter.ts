import { Encrypter } from "../../src/domain/cryptography/encypter";

export class FakeEncrypter implements Encrypter {
	async encrypt(payload: Record<string, unknown>): Promise<string> {
		return JSON.stringify(payload);
	}
}
