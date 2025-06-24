import CircleProgress from "@/components/ui/circle-progress";

interface ProjectProgressProps {
	percentage: number;
}

export function ProjectProgress({ percentage }: ProjectProgressProps) {
	return <CircleProgress percentage={percentage} size={80} />;
}
