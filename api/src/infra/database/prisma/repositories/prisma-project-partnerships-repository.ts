import { ProjectPartnership } from "../../../../domain/entities/project-partnership";
import { ProjectPartnershipsRepository } from "../../../../domain/repositories/project-partnerships-repository";
import { PrismaProjectPartnershipMapper } from "../mappers/prisma-project-partnership-mapper";
import { prisma } from "../prisma";

export class PrismaProjectPartnershipsRepository
	implements ProjectPartnershipsRepository
{
	async findById(id: string): Promise<ProjectPartnership | null> {
		const projectPartnership = await prisma.projectPartnership.findUnique({
			where: {
				id,
			},
		});

		if (!projectPartnership) {
			return null;
		}

		return PrismaProjectPartnershipMapper.toDomain(projectPartnership);
	}

	async findByTerm(term: string): Promise<ProjectPartnership | null> {
		const projectPartnership = await prisma.projectPartnership.findFirst({
			where: {
				term,
			},
		});

		if (!projectPartnership) {
			return null;
		}

		return PrismaProjectPartnershipMapper.toDomain(projectPartnership);
	}

	async findByAgency(agency: string): Promise<ProjectPartnership | null> {
		const projectPartnership = await prisma.projectPartnership.findFirst({
			where: {
				agency,
			},
		});

		if (!projectPartnership) {
			return null;
		}

		return PrismaProjectPartnershipMapper.toDomain(projectPartnership);
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<ProjectPartnership[] | null> {
		const projectPartnerships = await prisma.projectPartnership.findMany({
			where: {
				municipalityId,
			},
		});

		if (!projectPartnerships.length) {
			return null;
		}

		const projectPartnershipsDomain = projectPartnerships.map((pp) => {
			return PrismaProjectPartnershipMapper.toDomain(pp);
		});

		return projectPartnershipsDomain;
	}
}
