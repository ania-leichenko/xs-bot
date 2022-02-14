import eam from 'assets/img/eam.svg';
import bs from 'assets/img/binary-storage.svg';
import sc from 'assets/img/server-computing.svg';
import slc from 'assets/img/sl-computing.svg';
import { ServiceMenuItem } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';

const SERVICE_MENU_ITEMS: ServiceMenuItem[] = [
  {
    title: 'Entity Access Management',
    img: eam,
    route: AppRoute.EAM,
  },
  {
    title: 'Binary Storage',
    img: bs,
    route: AppRoute.BS,
  },
  {
    title: 'Server Computing',
    img: sc,
    route: AppRoute.SC,
  },
  {
    title: 'ServerLess Computing',
    img: slc,
    route: AppRoute.SLC,
  },
];

export { SERVICE_MENU_ITEMS };
