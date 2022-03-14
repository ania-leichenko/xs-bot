import {
  LambdaClient,
  CreateFunctionCommand,
  CreateFunctionCommandOutput,
  DeleteFunctionCommand,
  DeleteFunctionCommandOutput,
  UpdateFunctionCodeCommand,
  UpdateFunctionCodeCommandOutput,
  InvokeCommand,
} from '@aws-sdk/client-lambda';
import AdmZip from 'adm-zip';
import {
  ExceptionMessage,
  HttpCode,
  LambdaDefaultParam,
} from '~/common/enums/enums';
import { toUtf8 } from '@aws-sdk/util-utf8-node';
import { SLCError } from '~/exceptions/exceptions';

type Constructor = {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  role: string;
};

class Lambda {
  #lambdaClient: LambdaClient;
  #role: string;

  constructor({ region, credentials, role }: Constructor) {
    this.#lambdaClient = new LambdaClient({
      region,
      credentials,
    });
    this.#role = role;
  }

  public async createFunction({
    name,
    sourceCode,
  }: {
    name: string;
    sourceCode: string;
  }): Promise<CreateFunctionCommandOutput> {
    const zipArchive = new AdmZip();

    zipArchive.addFile(
      LambdaDefaultParam.ROOT_FILE,
      Buffer.alloc(sourceCode.length, sourceCode),
    );

    const sendZipArchive = zipArchive.toBuffer();

    return this.#lambdaClient.send(
      new CreateFunctionCommand({
        Architectures: [LambdaDefaultParam.ARCHITECTURE],
        Handler: LambdaDefaultParam.HANDLER,
        MemorySize: LambdaDefaultParam.MEMORY_SIZE,
        Runtime: LambdaDefaultParam.RUNTIME,
        Timeout: LambdaDefaultParam.TIMEOUT,
        Code: {
          'ZipFile': sendZipArchive,
        },
        FunctionName: name,
        Role: this.#role,
      }),
    );
  }

  public async deleteFunction(
    name: string,
  ): Promise<DeleteFunctionCommandOutput> {
    return this.#lambdaClient.send(
      new DeleteFunctionCommand({
        FunctionName: name,
      }),
    );
  }

  public async updateFunctionCode(
    name: string,
    sourceCode: string,
  ): Promise<UpdateFunctionCodeCommandOutput> {
    const zipArchive = new AdmZip();

    zipArchive.addFile(
      LambdaDefaultParam.ROOT_FILE,
      Buffer.alloc(sourceCode.length, sourceCode),
    );

    const sendZipArchive = zipArchive.toBuffer();

    return this.#lambdaClient.send(
      new UpdateFunctionCodeCommand({
        FunctionName: name,
        ZipFile: sendZipArchive,
      }),
    );
  }

  public async runFunction(name: string): Promise<string> {
    const { Payload, StatusCode } = await this.#lambdaClient.send(
      new InvokeCommand({
        FunctionName: name,
      }),
    );

    if (StatusCode !== 200 || !Payload) {
      throw new SLCError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: ExceptionMessage.FUNCTION_NOT_RUN,
      });
    }

    return JSON.stringify(JSON.parse(toUtf8(Payload)), null, '\t');
  }
}

export { Lambda };
