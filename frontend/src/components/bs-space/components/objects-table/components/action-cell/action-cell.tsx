import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';

const ActionCell = (
  id: string,
  name: string,
  onObjectDownload: (objectId: string, fileName: string) => void,
): JSX.Element => {
  const handleDownload = (): void => {
    onObjectDownload(id, name);
  };
  return (
    <IconButton
      icon={IconName.DOWNLOAD}
      label="Download"
      onClick={handleDownload}
    />
  );
};

export { ActionCell };
