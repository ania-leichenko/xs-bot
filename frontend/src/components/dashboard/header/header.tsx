import logo from 'assets/img/logo.svg';
import profile from 'assets/img/profile.svg';
import menu from 'assets/img/menu.svg';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import styles from './header.module.scss';

type Props = {
  img?: string;
  name?: string;
  onLogOut?: React.MouseEventHandler<HTMLDivElement>;
};

const Header: React.FC<Props> = ({ img, name, onLogOut }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerConteiner}>
        <Link to={AppRoute.SIGN_IN}>
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <div className={styles.menu}>
          <div className={styles.profile}>
            <img src={img ?? profile} alt="profile" />
            <span>{name ?? 'Binary studio'}</span>
          </div>
          <div className={styles.dropdownMenu}>
            <img src={menu} alt="menu" />
            <div className={styles.dropdownContent}>
              <div className={styles.dropdownItem} onClick={onLogOut}>
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export { Header };
