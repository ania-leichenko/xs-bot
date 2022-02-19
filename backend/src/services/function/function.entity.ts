import { getRandomId } from '~/helpers/helpers';

class SLC {
  public id: string;
  public name: string;
  public createdAt: string;
  public sourceCode: string;
  public createdBy: string;
  public awsLambdaId: string;
  public updatedAt: string;

  private constructor({
    id,
    name,
    createdAt,
    sourceCode,
    createdBy,
    awsLambdaId,
    updatedAt,
  }: {
    id: string;
    name: string;
    createdAt: string;
    sourceCode: string;
    createdBy: string;
    awsLambdaId: string;
    updatedAt: string;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.sourceCode = sourceCode;
    this.createdBy = createdBy;
    this.awsLambdaId = awsLambdaId;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    name,
    createdAt,
    sourceCode,
    createdBy,
    awsLambdaId,
    updatedAt,
  }: {
    id: string;
    name: string;
    createdAt: string;
    sourceCode: string;
    createdBy: string;
    awsLambdaId: string;
    updatedAt: string;
  }): SLC {
    return new SLC({
      id,
      name,
      createdAt,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt,
    });
  }

  public static createNew({
    name,
    sourceCode,
    createdBy,
    awsLambdaId,
  }: {
    name: string;
    sourceCode: string;
    createdBy: string;
    awsLambdaId: string;
  }): SLC {
    const date = new Date().toISOString();

    return new SLC({
      id: getRandomId(),
      name,
      createdAt: date,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt: date,
    });
  }
}

export { SLC };
