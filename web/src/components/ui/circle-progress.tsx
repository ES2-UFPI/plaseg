import { cn } from "@/lib/utils";

export default function CircleProgress({
	percentage = 60,
	size = 120,
	strokeWidth = 8,
	color = "blue",
	backgroundColor = "slate",
}) {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	const colorClasses: Record<string, string> = {
		blue: "stroke-blue-500",
		green: "stroke-green-500",
		red: "stroke-red-500",
		purple: "stroke-purple-500",
		yellow: "stroke-yellow-500",
		indigo: "stroke-indigo-500",
	};

	const bgColorClasses: Record<string, string> = {
		gray: "stroke-gray-200",
		slate: "stroke-slate-200",
		neutral: "stroke-neutral-200",
	};

	return (
		<div className="flex items-center justify-center">
			<div className="relative" style={{ width: size, height: size }}>
				<svg
					width={size}
					height={size}
					className="transform -rotate-90"
					viewBox={`0 0 ${size} ${size}`}
				>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						className={bgColorClasses[backgroundColor] || bgColorClasses.slate}
						strokeWidth={strokeWidth}
					/>

					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						className={colorClasses[color] || colorClasses.blue}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						style={{
							transition: "stroke-dashoffset 0.5s ease-in-out",
						}}
					/>
				</svg>

				<div className="absolute inset-0 flex items-center justify-center">
					<span
						className={cn(
							"text-2xl font-semibold",
							percentage === 0 ? "text-muted-foreground" : "text-blue-600"
						)}
					>
						{percentage}%
					</span>
				</div>
			</div>
		</div>
	);
}
