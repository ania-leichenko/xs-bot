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

  public saveBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

export { Saver };
