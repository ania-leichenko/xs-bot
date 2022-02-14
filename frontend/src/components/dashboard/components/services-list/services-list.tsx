import { FC } from 'react';
import { ServicesItem } from '../services-item/services-item';
import styles from './styles.module.scss';
import { ServiceMenuItem } from 'common/types/ui/service-menu';

type Props = {
  services: ServiceMenuItem[];
};

const ServicesList: FC<Props> = ({ services }) => (
  <ul className={styles.cardsContainer}>
    {services.map((element) => (
      <li key={element.title} className={styles.itemCard}>
        <ServicesItem service={element} />
      </li>
    ))}
  </ul>
);

export { ServicesList };
