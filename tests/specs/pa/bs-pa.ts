import * as assert from 'assert';

import { BS } from '../po/bs-po';
import { bsData } from '../test-data/bs-data';

const bs = new BS();

class BSActions {

  async CreateBucket(): Promise<void> {
    await bs.AddSpace_Button.click();
    await bs.SpaceName_Field.setValue(bsData.SpaceName);
    await bs.Create_Button.waitForClickable({
      timeout: 2000,
    });
    await bs.Create_Button.click();
  }

  async UploadFile(): Promise<void> {
    await bs.Bucket_Link.click();
    const remoteFilePath = await browser.uploadFile(
      '../tests/specs/dashboard/dashboard.ts',
    );
    await bs.File_Input.setValue(remoteFilePath);
    await bs.Reload_Button.waitForClickable({
      timeout: 2000,
    });
    await bs.Reload_Button.click();
  }

  async DeleteFile(): Promise<void> {
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

  async CheckFileExist(): Promise<void> {
    await bs.TableCell.waitForExist({
      timeout: 2000,
    });
    const tableCellValue = await bs.TableCell.getText();
    const fileCreated = bsData.FileName == tableCellValue;
    assert.equal(fileCreated, true);
  }

  async CheckFileDeleting(): Promise<void> {
    let tableCellValue;
    if ((await bs.TableCell.isExisting()) == true) {
      tableCellValue = await bs.TableCell.getText();
    }
    const fileCreated =
      (await bs.TableCell.isExisting()) == true &&
      bsData.FileName == tableCellValue;
    assert.equal(fileCreated, false);
  }

  async CheckBucketExist(): Promise<void> {
    const tableCell = await bs.TableCell;
    const tableCellValue = await tableCell.getText();
    const bucketCreated = bsData.SpaceName == tableCellValue;
    assert.equal(bucketCreated, true);
  }

  async DeleteBucket(): Promise<void> {
    await bs.Bucket.click();
    await bs.ConfirmDeleting.click();
  }

  async CheckBucketDelete(): Promise<void> {
    let tableCellValue;
    if ((await bs.TableCell.isExisting()) == true) {
      tableCellValue = await bs.TableCell.getText();
    }
    const bucketCreated =
      (await bs.TableCell.isExisting()) == true &&
      bsData.FileName == tableCellValue;
    assert.equal(bucketCreated, false);
  }
}

export { BSActions };
