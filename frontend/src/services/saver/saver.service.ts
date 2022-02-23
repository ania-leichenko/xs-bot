import { ContentType } from 'common/enums/enums';
import { saveAs } from 'file-saver';

class Saver {
  public saveCSV(content: string[][], fileName: string): void {
    const csvContent = content.map((e) => e.join(' ')).join('\n');

    const csvFile = new File([csvContent], `${fileName}.csv`, {
      type: ContentType.CSV,
    });
    saveAs(csvFile);
  }
}

export { Saver };
