export interface HashComparer {
	compare(plain: string, hash: string): Promise<boolean>;
}
