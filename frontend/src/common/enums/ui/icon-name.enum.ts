import deleteIcon from 'assets/img/delete-icon.svg';

enum IconName {
  TRASH = 'trash',
}

const iconNameToSrc = {
  [IconName.TRASH]: deleteIcon,
};

export { IconName, iconNameToSrc };
