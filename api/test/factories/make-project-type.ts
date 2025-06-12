import { ProjectType, ProjectTypeProps } from "../../src/domain/entities/project-type";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Document } from "../../src/domain/entities/document";
import { getCurrentDate } from "../../src/core/utils/get-current-date";

type Override = Partial<ProjectTypeProps>;

export function makeProjectType(override: Override = {}) {
  const defaultDocuments: Document[] = [
    Document.create({
      name: "Default Document",
      fields: [],
    }),
  ];

  const projectType = ProjectType.create(
    {
      name: "Default Project Type",
      documents: defaultDocuments,
      createdAt: getCurrentDate(),
      ...override,
    },
    new UniqueEntityID()
  );

  return projectType;
}