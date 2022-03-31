import * as assert from 'assert';

import { SC } from '../po/sc-po';
import { scData } from '../test-data/sc-data';

const sc = new SC();

class SCActions {

    async CreateInstance() {

       await sc.AddInstance_Button.click();
       await sc.InstanceName_Field.setValue(scData.InstanceName);
       await sc.OSFieldShown.click();
       await sc.ubuntu18.click();
       await sc.Create_Button.waitForClickable({
         timeout: 2000,
       });
       await sc.Create_Button.click();
    }

    async CheckInstanceExist() {
        await sc.TableCell.waitForExist({
            timeout: 5000,
          });
        let tableCellValue = await sc.TableCell.getText();
        let fileCreated = scData.InstanceName == tableCellValue;
        assert.equal(fileCreated,true);
    }

    async DeleteInstance() {

        await sc.Bucket.click();
        await sc.ConfirmDeleting.click();
        await browser.pause(5000);

    }

    async CheckInstanceDelete() {
        let tableCellValue;
        if (await sc.TableCell.isExisting() == true){
           tableCellValue = await sc.TableCell.getText();
        };
        let bucketCreated = (await sc.TableCell.isExisting() == true)&&(scData.InstanceName == tableCellValue);
        assert.equal(bucketCreated,false);
      }

}

export { SCActions };
