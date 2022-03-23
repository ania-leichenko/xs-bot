import { File } from 'fastify-multer/lib/interfaces';
import {
  EAMMasterSignInResponseDto,
  EAMWorkerSignInResponseDto,
} from '~/common/types/types';

declare module 'fastify' {
  interface FastifyRequest {
    file?: File;
    user?: EAMMasterSignInResponseDto | EAMWorkerSignInResponseDto;
  }
}
