import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { ValueObject } from "../../../core/entities/value-object";
import { Document } from "../document";

export interface ProjectWithMoreInfoProps {
	id: UniqueEntityID;
	title: string;
	responsibleCpf?: string;
	responsibleName?: string;
	responsibleEmail?: string;
	responsiblePhone?: string;
	counterpartCapitalItem?: string;
	counterpartCapitalValue?: number;
	counterpartOperatingCostCode?: string;
	counterpartOperatingCostValue?: number;
	totalValue?: number;
	requestedValue?: number;
	baseValue?: number;
	createdAt: Date;
	updatedAt?: Date | null;
	documents: Document[];
	municipality: {
		id: UniqueEntityID;
		name: string;
	};
	opportunity: {
		id: UniqueEntityID;
		title: string;
		counterpartPercentage: number;
		requiresCounterpart: boolean;
		maxValue: number | null;
		availableValue: number | null;
		minValue: number | null;
	};
	projectType: {
		id: UniqueEntityID;
		name: string;
	};
	requestedItems?: {
		id: UniqueEntityID;
		quantity: number;
		baseProduct: {
			id: UniqueEntityID;
			name: string;
			unitValue: number;
		};
	}[];
}

export class ProjectWithMoreInfo extends ValueObject<ProjectWithMoreInfoProps> {
	private constructor(props: ProjectWithMoreInfoProps) {
		super(props);
	}

	get id() {
		return this.props.id;
	}

	get title() {
		return this.props.title;
	}

	get opportunity() {
		return this.props.opportunity;
	}

	get projectType() {
		return this.props.projectType;
	}

	get responsibleCpf() {
		return this.props.responsibleCpf;
	}

	get municipality() {
		return this.props.municipality;
	}

	get responsibleName() {
		return this.props.responsibleName;
	}

	get responsibleEmail() {
		return this.props.responsibleEmail;
	}

	get responsiblePhone() {
		return this.props.responsiblePhone;
	}

	get counterpartCapitalItem() {
		return this.props.counterpartCapitalItem;
	}

	get counterpartCapitalValue() {
		return this.props.counterpartCapitalValue;
	}

	get counterpartOperatingCostCode() {
		return this.props.counterpartOperatingCostCode;
	}

	get counterpartOperatingCostValue() {
		return this.props.counterpartOperatingCostValue;
	}

	get totalValue() {
		return this.props.totalValue;
	}

	get requestedValue() {
		return this.props.requestedValue;
	}

	get baseValue() {
		return this.props.baseValue;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get documents() {
		return this.props.documents;
	}

	get requestedItems() {
		return this.props.requestedItems;
	}

	static create(props: ProjectWithMoreInfoProps) {
		return new ProjectWithMoreInfo(props);
	}
}
