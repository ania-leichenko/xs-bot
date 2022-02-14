import { FC } from 'react';
import styles from './section-line-vertical.module.scss';

type Props = {
  position: string;
};

const SectionLineVertical: FC<Props> = ({ position }) => (
  <span className={styles.wrapper} style={{ left: position }}></span>
);

export { SectionLineVertical };
