import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';

const ActionCell = (
  id: string,
  // onObjectDownload: (id: string) => void,
): JSX.Element => {
  // const handleDownload = (): void => {
  //   onObjectDownload(id);
  // };
  return (
    <IconButton
      icon={IconName.DOWNLOAD}
      label="Download"
      onClick={
        (): void => {
          id;
        }
        // handleDownload
      }
    />
  );
};

export { ActionCell };
