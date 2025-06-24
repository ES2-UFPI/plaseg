import { ReactNode } from "react";

interface FeatureProps {
	text: string;
	children: ReactNode;
}

export function Feature({ text, children }: FeatureProps) {
	return (
		<div>
			<div className="p-4 flex gap-5 items-start text-left font-bold">
				<div className="w-4 h-4">{children}</div>
				{text}
			</div>
		</div>
	);
}
