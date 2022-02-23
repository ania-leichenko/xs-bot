import { saveAs } from 'file-saver';

class SaveCsv {
  public save(content: string[][], fileName: string): void {
    const csvContent = content.map((e) => e.join(' ')).join('\n');

    const file = new File([csvContent], fileName, {
      type: 'text/csv;encoding:utf-8',
    });
    saveAs(file);
  }
}

export { SaveCsv };
