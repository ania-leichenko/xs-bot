import { FC } from 'react';
import { ServicesItem } from '../services-item/services-item';
import styles from './styles.module.scss';
import { IService } from '../../common/services';

interface props {
  services: IService[];
}

const ServicesList: FC<props> = ({ services }) => (
  <ul className={styles.cardsContainer}>
    {services.map((element) => (
      <li key={`${element.title}`} className={styles.itemCard}>
        <ServicesItem service={element} />
      </li>
    ))}
  </ul>
);

export { ServicesList };
