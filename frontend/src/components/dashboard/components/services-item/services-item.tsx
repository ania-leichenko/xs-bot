import { FC } from 'react';
import { Button, Link } from '../../../common/common';
import styles from './styles.module.scss';
import { IService } from '../../common/services';

interface props {
  service: IService;
}

const ServicesItem: FC<props> = ({ service }) => (
  <div className={styles.cardContent}>
    <div className={styles.imgWrapper}>
      <img src={service.img} alt={service.title} />
    </div>
    <div className={styles.cardTitle}>
      <span>{service.title}</span>
    </div>
    <div className={styles.buttonContainer}>
      <Link to={service.route}>
        <Button label={'Start'} />
      </Link>
    </div>
  </div>
);
export { ServicesItem };
