import { s3 as s3 } from '~/services/aws/s3/s3.client';
import { CreateBucketCommand, CreateBucketOutput } from '@aws-sdk/client-s3';

type Constructor = {
  s3Client: typeof s3;
};

class S3 {
  #s3Client: typeof s3;

  constructor({ s3Client }: Constructor) {
    this.#s3Client = s3Client;
  }

  public async creteBucket({
    name,
  }: {
    name: string;
  }): Promise<CreateBucketOutput> {
    return s3.send(new CreateBucketCommand({ Bucket: name }));
  }
}

export { S3 };
