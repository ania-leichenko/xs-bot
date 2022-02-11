import logo from 'assets/img/logo.svg';
import profile from 'assets/img/profile.svg';
import menu from 'assets/img/menu.svg';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { useState } from 'react';
import styles from './header.module.scss';

type Props = {
  img?: string;
  name: string;
  onLogOut?: React.MouseEventHandler<HTMLDivElement>;
};

const Header: React.FC<Props> = ({ img, name, onLogOut }) => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const handleOnVisible = (): void => setVisible(!isVisible);

  return (
    <header className={styles.header}>
      <div className={styles.headerConteiner}>
        <Link to={AppRoute.SIGN_IN}>
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <div className={styles.menu}>
          <div className={styles.profile}>
            <img src={img ?? profile} alt="profile" />
            <span className={styles.profileName}>{name}</span>
          </div>
          <div className={styles.dropdownMenu} onClick={handleOnVisible}>
            <img className={styles.dropdownMenuImg} src={menu} alt="menu" />
            {isVisible && (
              <div className={styles.dropdownContent}>
                <div className={styles.dropdownItem} onClick={onLogOut}>
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export { Header };
