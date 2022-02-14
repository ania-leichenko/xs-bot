import { AppRoute } from 'common/enums/app/app-route.enum';
import { ServiceMenuItem } from 'common/types/ui/service-menu';
import { bs, eam, sc, slc } from './constans';

const SERVICE_MENU_ITEMS: readonly ServiceMenuItem[] = [
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
] as const;

export { SERVICE_MENU_ITEMS };
