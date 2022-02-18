import { S3Client } from '@aws-sdk/client-s3';
import { ENV } from '~/common/enums/app/env.enum';

const s3 = new S3Client({
  region: ENV.AWS.REGION,
  credentials: {
    accessKeyId: ENV.AWS.ACCESS_KEY,
    secretAccessKey: ENV.AWS.SECRET_KEY,
  },
});

export { s3 };
