import {
  CreateBucketCommand,
  CreateBucketOutput,
  DeleteBucketCommand,
  DeleteBucketCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { BsError } from '~/exceptions/bs-error/bs-error';
import { ExceptionMessage } from '~/common/enums/enums';

type Constructor = {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

class S3 {
  #s3Client: S3Client;

  constructor({ region, credentials }: Constructor) {
    this.#s3Client = new S3Client({
      region,
      credentials,
    });
  }

  public async creteBucket(name: string): Promise<CreateBucketOutput | void> {
    return this.#s3Client
      .send(new CreateBucketCommand({ Bucket: name }))
      .catch((err) => {
        throw new BsError({
          status: err.$response.statusCode,
          message:
            err.message === 'BucketAlreadyExists' ||
            err.message === 'BucketAlreadyOwnedByYou'
              ? ExceptionMessage.SPACE_EXISTS
              : err.message,
        });
      });
  }

  public async deleteBucket(name: string): Promise<DeleteBucketCommandOutput> {
    return this.#s3Client.send(new DeleteBucketCommand({ Bucket: name }));
  }
}

export { S3 };
