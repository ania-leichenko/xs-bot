import { getRandomId } from '~/helpers/helpers';

class SLCFunction {
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
  }): SLCFunction {
    return new SLCFunction({
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
  }): SLCFunction {
    const date = new Date().toISOString();

    return new SLCFunction({
      id: getRandomId(),
      name,
      createdAt: date,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt: date,
    });
  }

  public setSourceCode(sourceCode: string): void {
    this.sourceCode = sourceCode;
    this.updatedAt = new Date().toISOString();
  }
}

export { SLCFunction };
