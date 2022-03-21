import { File } from 'fastify-multer/lib/interfaces';

type UploadPayload = {
  token: string;
  file?: File;
  id: string;
};

export { type UploadPayload };
