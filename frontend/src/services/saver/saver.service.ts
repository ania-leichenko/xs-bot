import { ContentType } from 'common/enums/enums';

class Saver {
  public saveCSV(content: string[][], fileName: string): File {
    const csvContent = content.map((e) => e.join(' ')).join('\n');

    return new File([csvContent], `${fileName}.csv`, {
      type: ContentType.CSV,
    });
  }
}

export { Saver };
