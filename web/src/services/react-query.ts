import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutos
			refetchOnWindowFocus: false, // Não refaz a requisição quando a janela está em foco
			refetchOnReconnect: false, // Não refaz a requisição quando o usuário volta online
		},
	},
});
