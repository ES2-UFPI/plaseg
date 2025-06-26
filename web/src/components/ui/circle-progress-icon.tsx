import { CircleCheckBig } from "lucide-react";

export function CircleProgressIcon({
	percentage = 0,
	size = 24,
}: {
	percentage?: number;
	size?: number;
}) {
	const normalizedPercentage = Math.max(0, Math.min(100, percentage));

	if (normalizedPercentage === 100) {
		return <CircleCheckBig className="text-primary" size={size} />;
	}

	const radius = 10;
	const strokeWidth = 2;
	const center = 12;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset =
		circumference - (normalizedPercentage / 100) * circumference;

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			className="transform -rotate-90"
		>
			{/* Círculo de fundo (slate) */}
			<circle
				cx={center}
				cy={center}
				r={radius}
				stroke="currentColor"
				strokeWidth={strokeWidth}
				fill="none"
				className="text-slate-300"
			/>
			{/* Círculo de progresso (azul) */}
			<circle
				cx={center}
				cy={center}
				r={radius}
				stroke="currentColor"
				strokeWidth={strokeWidth}
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={strokeDashoffset}
				strokeLinecap="round"
				className="text-blue-500 transition-all duration-300 ease-in-out"
			/>
		</svg>
	);
}
