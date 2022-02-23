class OperationSystem {
  public id: string;
  public name: string;
  public createdAt: string;
  public awsGenerationName: string;

  private constructor({
    id,
    name,
    createdAt,
    awsGenerationName,
  }: {
    id: string;
    name: string;
    createdAt: string;
    awsGenerationName: string;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.awsGenerationName = awsGenerationName;
  }

  public static initialize({
    id,
    name,
    createdAt,
    awsGenerationName,
  }: {
    id: string;
    name: string;
    createdAt: string;
    awsGenerationName: string;
  }): OperationSystem {
    return new OperationSystem({
      id,
      name,
      createdAt,
      awsGenerationName,
    });
  }
}

export { OperationSystem };
