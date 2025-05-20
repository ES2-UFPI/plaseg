import { QualifiedStaff } from "../../../../domain/entities/qualified-staff";
import { QualifiedStaffsRepository } from "../../../../domain/repositories/qualified-staffs-repository";
import { PrismaQualifiedStaffMapper } from "../mappers/prisma-qualified-staff-mapper";
import { prisma } from "../prisma";

export class PrismaQualifiedStaffRepository
	implements QualifiedStaffsRepository
{
	async findById(id: string): Promise<QualifiedStaff | null> {
		const qualifiedStaff = await prisma.qualifiedStaff.findUnique({
			where: {
				id,
			},
		});

		if (!qualifiedStaff) {
			return null;
		}

		return PrismaQualifiedStaffMapper.toDomain(qualifiedStaff);
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<QualifiedStaff[] | null> {
		const qualifiedStaffs = await prisma.qualifiedStaff.findMany({
			where: {
				municipalityId,
			},
		});

		if (!qualifiedStaffs) {
			return null;
		}

		const qualifiedStaffsDomain = qualifiedStaffs.map((qs) => {
			return PrismaQualifiedStaffMapper.toDomain(qs);
		});

		return qualifiedStaffsDomain;
	}

	async findByName(name: string): Promise<QualifiedStaff | null> {
		const qualifiedStaff = await prisma.qualifiedStaff.findFirst({
			where: {
				name,
			},
		});

		if (!qualifiedStaff) {
			return null;
		}

		return PrismaQualifiedStaffMapper.toDomain(qualifiedStaff);
	}

	async findByDocument(document: string): Promise<QualifiedStaff | null> {
		const qualifiedStaff = await prisma.qualifiedStaff.findFirst({
			where: {
				document,
			},
		});

		if (!qualifiedStaff) {
			return null;
		}

		return PrismaQualifiedStaffMapper.toDomain(qualifiedStaff);
	}
}
