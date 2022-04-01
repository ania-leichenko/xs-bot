import * as assert from 'assert';

import { SC } from '../po/sc-po';
import { scData } from '../test-data/sc-data';

const sc = new SC();

class SCActions {

    async CreateInstance(): Promise<void> {
      await sc.AddInstance_Button.click();
      await sc.InstanceName_Field.setValue(scData.InstanceName);
      await sc.OSFieldShown.click();
      await sc.ubuntu18.click();
      await sc.Create_Button.waitForClickable({
        timeout: 2000,
      });
      await sc.Create_Button.click();
    }

    async CheckInstanceExist(): Promise<void> {
      await sc.TableCell.waitForExist({
        timeout: 5000,
      });
      const tableCellValue = await sc.TableCell.getText();
      const fileCreated = scData.InstanceName == tableCellValue;
      assert.equal(fileCreated,true);
    }

    async DeleteInstance(): Promise<void> {
      await sc.Bucket.click();
      await sc.ConfirmDeleting.click();
    }

    async CheckInstanceDelete(): Promise<void> {
      let tableCellValue;
      if (await sc.TableCell.isExisting() == true){
        tableCellValue = await sc.TableCell.getText();
      }
      const bucketCreated = (await sc.TableCell.isExisting() == true)&&(scData.InstanceName == tableCellValue);
      assert.equal(bucketCreated,false);
    }

    async ChangeName(newName: string): Promise<void> {
      await sc.EditIcon.click();
      await sc.InstanceName_Field.clearValue();
      await sc.InstanceName_Field.setValue(newName);
      await sc.Create_Button.click();
    }

    async CheckChangeName(newName: string): Promise<void> {
      await browser.pause(1000);
      await sc.Reload_Button.click();
      await sc.TableCell.waitForExist();
      const TableCellText = await sc.TableCell.getText();
      const nameCanged = newName == TableCellText;
      assert.equal(nameCanged,true);
  }

}

export { SCActions };
