import { FC } from 'react';
import { Button, Link } from 'components/common/common';
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
    <span className={styles.cardTitle}>{service.title}</span>
    <div className={styles.buttonContainer}>
      <Link to={service.route}>
        <Button label={'Start'} />
      </Link>
    </div>
  </article>
);
export { ServicesItem };
