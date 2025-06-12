import { makeProjectType } from "../../../../test/factories/make-project-type";
import { InMemoryProjectTypesRepository } from "../../../../test/repositories/in-memory-project-types-repository";

import { CreateProjectTypeUseCase } from "./create-project-type";


let inMemoryProjectTypesRepository: InMemoryProjectTypesRepository;
let sut: CreateProjectTypeUseCase;

describe("Create Project Type Use Case", () => {
  beforeEach(() => {
    inMemoryProjectTypesRepository = new InMemoryProjectTypesRepository();
    sut = new CreateProjectTypeUseCase(inMemoryProjectTypesRepository);
  });

  it("should be able to create a new project type", async () => {
    const projectTypeData = makeProjectType();

    const result = await sut.execute({
      name: projectTypeData.name,
      documents: [
        {
          name: "Document 1",
          fields: [
            { name: "Field A", value: "Value A" },
            { name: "Field B", value: "Value B" },
          ],
        },
      ],
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      const created = result.value.projectType;
      expect(created.name).toBe(projectTypeData.name);
      expect(created.documents).toHaveLength(1);
      expect(inMemoryProjectTypesRepository.items[0]).toEqual(created);
    }
  });

  it("should not allow creating a project type with duplicate name", async () => {
    const projectTypeData = makeProjectType();

    await sut.execute({
      name: projectTypeData.name,
      documents: [],
    });

    const result = await sut.execute({
      name: projectTypeData.name,
      documents: [],
    });

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value.message).toBe("Tipo de Projeto com esse nome já cadastrado!");
    }
  });
});