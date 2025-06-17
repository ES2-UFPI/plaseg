import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { RequiredDocument } from "./required-document";
import { Document } from "./document";
import { Slug } from "./value-objects/slug";

export interface OpportunityProps {
	title: string;
	slug: Slug;
	description: string;
	responsibleAgency: string;
	availableValue: number;
	minValue: number;
	maxValue: number;
	initialDeadline: Date;
	finalDeadline: Date;
	requiresCounterpart: boolean;
	counterpartPercentage?: number;
	requiredDocuments: RequiredDocument[];
	documents: Document[];
	isActive: boolean;
	releasedForAll?: boolean;
	type: string;
	typeId: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class Opportunity extends Entity<OpportunityProps> {
	get title() {
		return this.props.title;
	}

	get slug() {
		return this.props.slug;
	}

	get description() {
		return this.props.description;
	}

	get responsibleAgency() {
		return this.props.responsibleAgency;
	}

	get availableValue() {
		return this.props.availableValue;
	}

	get minValue() {
		return this.props.minValue;
	}

	get maxValue() {
		return this.props.maxValue;
	}

	get initialDeadline() {
		return this.props.initialDeadline;
	}

	get finalDeadline() {
		return this.props.finalDeadline;
	}

	get requiresCounterpart() {
		return this.props.requiresCounterpart;
	}

	get counterpartPercentage() {
		return this.props.counterpartPercentage;
	}

	get isActive() {
		return this.props.isActive;
	}

	get releasedForAll() {
		return this.props.releasedForAll;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get requiredDocuments() {
		return this.props.requiredDocuments;
	}

	get documents() {
		return this.props.documents;
	}

	get typeId() {
		return this.props.typeId;
	}

	get type() {
		return this.props.type;
	}

	set requiredDocuments(requiredDocuments: RequiredDocument[]) {
		this.props.requiredDocuments = requiredDocuments;
	}

	addRequiredDocument(requiredDocument: RequiredDocument) {
		this.props.requiredDocuments.push(requiredDocument);
	}

	static create(
		props: Optional<
			OpportunityProps,
			"isActive" | "slug" | "createdAt" | "updatedAt" | "releasedForAll"
		>,
		id?: UniqueEntityID
	) {
		const opportunity = new Opportunity(
			{
				...props,
				slug: props.slug ?? Slug.createFromText(props.title),
				isActive: props.isActive ?? true,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
				releasedForAll: props.releasedForAll ?? false,
			},
			id
		);

		return opportunity;
	}
}
