import { FC } from 'react';
import { Button } from 'components/common/common';
import { ServiceMenuItem } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  service: ServiceMenuItem;
};

const ServicesItem: FC<Props> = ({ service }) => (
  <article className={styles.cardContent}>
    <div className={styles.imgWrapper}>
      <img src={service.img} alt={service.title} />
    </div>
    <h3 className={styles.cardTitle}>{service.title}</h3>
    <Button className={styles.link} to={service.route} label="Start" />
  </article>
);

export { ServicesItem };
