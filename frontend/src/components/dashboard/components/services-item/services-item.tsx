import { FC } from 'react';
import { Button } from 'components/common/common';
import styles from './styles.module.scss';
import { ServiceMenuItem } from 'common/types/ui/service-menu';

interface props {
  service: ServiceMenuItem;
}

const ServicesItem: FC<props> = ({ service }) => (
  <article className={styles.cardContent}>
    <div className={styles.imgWrapper}>
      <img src={service.img} alt={service.title} />
    </div>
    <h3 className={styles.cardTitle}>{service.title}</h3>
    <Button to={service.route} label={'Start'} />
  </article>
);

export { ServicesItem };
