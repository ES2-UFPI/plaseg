import { useState } from "react";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { env } from "@/env";

const google = createGoogleGenerativeAI({
	apiKey: env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
});

export function useImproveFieldValue() {
	const [history, setHistory] = useState<string[]>([]);

	const addToHistory = (text: string) => {
		setHistory((prev) => [...prev, text].slice(-5));
	};

	const model = google("gemini-1.5-flash");

	const improveWithContext = async (currentText: string) => {
		const context =
			history.length > 0
				? `Versões anteriores geradas: ${history.join(" | ")}\n\n`
				: "";

		const { text: improvedText } = await generateText({
			model,
			prompt: `${context}Melhore o seguinte texto, evitando repetir padrões das versões anteriores.
			Não utilize markdown, listas, tópicos ou qualquer formatação especial.
			Gere apenas texto corrido, no mesmo estilo dos campos apresentados: "${currentText}"`,
		});

		addToHistory(improvedText);
		return improvedText;
	};

	return { history, improveWithContext };
}
