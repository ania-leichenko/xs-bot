import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';

const ActionCell = (
  id: string,
  onObjectDownload: (objectId: string) => void,
): JSX.Element => {
  const handleDownload = (): void => {
    onObjectDownload(id);
  };
  return (
    <IconButton
      title="Download"
      icon={IconName.DOWNLOAD}
      label="Download"
      onClick={handleDownload}
    />
  );
};

export { ActionCell };
