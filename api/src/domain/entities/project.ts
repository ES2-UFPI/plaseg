import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { Document } from "./document";
import { RequestedItem } from "./requested-item";

export interface ProjectProps {
	title: string;
	opportunityId: string;
	projectTypeId: string;
	municipalityId: string;
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
	requestedItems?: RequestedItem[];
}

export class Project extends Entity<ProjectProps> {
	get title() {
		return this.props.title;
	}

	get opportunityId() {
		return this.props.opportunityId;
	}

	get projectTypeId() {
		return this.props.projectTypeId;
	}

	get municipalityId() {
		return this.props.municipalityId;
	}

	get responsibleCpf() {
		return this.props.responsibleCpf;
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

	static create(
		props: Optional<ProjectProps, "createdAt" | "updatedAt">,
		id?: UniqueEntityID
	) {
		const project = new Project(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		return project;
	}
}
