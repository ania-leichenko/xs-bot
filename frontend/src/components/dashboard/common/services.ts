import eam from '../../../assets/img/eam.svg';
import bs from '../../../assets/img/binary-storage.svg';
import sc from '../../../assets/img/server-computing.svg';
import slc from '../../../assets/img/sl-computing.svg';
import { AppRoute } from '../../../common/enums/app/app-route.enum';

interface IService {
  title: string;
  img: string;
  route: AppRoute;
}

const services: IService[] = [
  {
    title: 'Entity Access Management',
    img: eam,
    route: AppRoute.EAM,
  },
  {
    title: 'Binary Storage',
    img: bs,
    route: AppRoute.BINARY_STORAGE,
  },
  {
    title: 'Server Computing',
    img: sc,
    route: AppRoute.SERVER_COMPUTING,
  },
  {
    title: 'ServerLess Computing',
    img: slc,
    route: AppRoute.SERVERLESS_COMPUTING,
  },
];

export { services };
export type { IService };
