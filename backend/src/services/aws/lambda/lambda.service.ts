import {
  LambdaClient,
  CreateFunctionCommand,
  CreateFunctionCommandOutput,
  Architecture,
  Runtime,
} from '@aws-sdk/client-lambda';
import AdmZip from 'adm-zip';

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

  public async creteFunction({
    name,
    sourceCode,
  }: {
    name: string;
    sourceCode: string;
  }): Promise<CreateFunctionCommandOutput> {
    const zipArchive = new AdmZip();

    zipArchive.addFile('index.js', Buffer.alloc(sourceCode.length, sourceCode));

    const sendZipArchive = zipArchive.toBuffer();

    return this.#lambdaClient.send(
      new CreateFunctionCommand({
        Architectures: [Architecture.x86_64],
        Code: {
          'ZipFile': sendZipArchive,
        },
        FunctionName: name,
        Runtime: Runtime.nodejs14x,
        Role: this.#role,
        Handler: '.zip',
      }),
    );
  }
}

export { Lambda };
