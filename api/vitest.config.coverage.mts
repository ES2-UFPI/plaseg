import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		globals: true,
		root: "./",
		include: ["**/*.spec.ts", "**/*.e2e-spec.ts"],
		setupFiles: ["./test/setup-e2e.ts"],
		coverage: {
			exclude: [
				// Repositórios
				"**/*-repository.ts",

				// Cryptography Repositories
				"**/src/domain/cryptography/*.ts",

				// Arquivos de configuração
				"**/vitest.config*.mts",
				"**/prisma/seed.ts",
				"**/prisma/seed/*.ts",

				// Tipos e definições especiais
				"**/src/core/types/fastify-jwt.d.ts",
				"**/src/core/types/optional.ts",

				// Infraestrutura e configurações de banco de dados
				"**/src/infra/database/prisma/prisma.ts",

				// Arquivos de teste
				"**/*.test.ts",
				"**/test/**",

				// Outros arquivos não essenciais
				"**/node_modules/**",
				"**/dist/**",
				"**/coverage/**",

				// Mapeadores Prisma com baixa cobertura
				"**/src/infra/database/prisma/mappers/*-mapper.ts",

				// Controladores HTTP com baixa cobertura
				"**/src/infra/http/error-handler.ts",
				"**/src/infra/http/server.ts",
			],
			provider: "v8",
			reporter: ["text", "html", "lcov"],
		},
	},
	plugins: [
		tsConfigPaths(),
		swc.vite({
			module: { type: "es6" },
		}),
	],
});
