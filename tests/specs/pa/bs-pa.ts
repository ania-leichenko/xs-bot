import * as assert from 'assert';

import { BS } from '../po/bs-po';
import { bsData } from '../test-data/bs-data';

const bs = new BS();

class BSActions {

    async CreateBucket() {

       await bs.AddSpace_Button.click();
       await bs.SpaceName_Field.setValue(bsData.SpaceName);
       await bs.Create_Button.waitForClickable({
         timeout: 2000,
       });
       await bs.Create_Button.click();

    }

    async UploadFile() {

        await bs.Bucket_Link.click();
        const remoteFilePath = await browser.uploadFile('../tests/specs/test-files/Logo.svg');
        await bs.File_Input.setValue(remoteFilePath);
        await bs.Reload_Button.waitForClickable({
          timeout: 2000,
        });
        await bs.Reload_Button.click();
 
    }

    async DeleteFile() {

        await bs.Bucket_Link.click();
        await bs.Bucket.waitForClickable({
          timeout: 2000,
        });
        await bs.Bucket.click();
        await bs.ConfirmDeleting.waitForClickable({
            timeout: 2000,
          });
          await bs.ConfirmDeleting.click();
 
    }

    async CheckFileExist() {
        await $('tr>td[class="styles_tableCell__C6dnh"]').waitForExist({
            timeout: 2000,
          });
        let tableCell = await $('tr>td[class="styles_tableCell__C6dnh"]');
        let tableCellValue = await tableCell.getText();
        let fileCreated;
        if (bsData.FileName == tableCellValue){
           fileCreated = true;
        }
        else{
           fileCreated = false;
        }
        assert.equal(fileCreated,true);
    }

    async CheckFileDeleting() {
        let tableCell = await $('tr>td[class="styles_tableCell__C6dnh"]');
        let fileCreated;
        if (await tableCell.isExisting() == true){
           let tableCellValue = await tableCell.getText();
           if (bsData.FileName == tableCellValue){
              fileCreated = true;
           }
           else{
              fileCreated = false;
           }
        }
        else{
           fileCreated = false;
        }
        assert.equal(fileCreated,false);
      }

    async CheckBucketExist() {
      let tableCell = await $('tr>td[class="styles_tableCell__C6dnh"]');
      let tableCellValue = await tableCell.getText();
      let bucketCreated;
      if (bsData.SpaceName == tableCellValue){
         bucketCreated = true;
      }
      else{
         bucketCreated = false;
      }
      assert.equal(bucketCreated,true);
    }

    async DeleteBucket() {

       await bs.Bucket.click();
       await bs.ConfirmDeleting.click();

    }

    async CheckBucketDelete() {
      let tableCell = await $('tr>td[class="styles_tableCell__C6dnh"]');
      let bucketCreated;
      if (await tableCell.isExisting() == true){
         let tableCellValue = await tableCell.getText();
         if (bsData.SpaceName == tableCellValue){
            bucketCreated = true;
         }
         else{
            bucketCreated = false;
         }
      }
      else{
         bucketCreated = false;
      }
      assert.equal(bucketCreated,false);
    }

}

export { BSActions };
