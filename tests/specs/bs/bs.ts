import * as assert from 'assert';

import { BS } from '../po/bs-po';
import { BSActions } from '../pa/bs-pa';
import { RegistrationActions } from '../pa/registration-pa';
import { DashboardActions } from '../pa/dashboard-pa';
import { bsData } from '../test-data/bs-data';
import { registerData } from '../test-data/register-data';

const dashact = new DashboardActions();
const regact = new RegistrationActions();
const bsact = new BSActions();
const bsobj = new BS();

describe('Worker', async () => {
  it('can create bucket', async () => {
    await browser.url('/');
    await regact.FillWorkerSignInForm(
      registerData.TenantNameForWorkerSignIn,
      registerData.WorkerName,
      registerData.WorkerPassword,
    );
    await regact.Sign();
    await dashact.OpenBS();
    await bsact.CreateBucket();
    await bsact.CheckBucketExist();
  });

  it('can upload file', async () => {
    await browser.url('/bs');
    await bsact.UploadFile();
    await bsact.CheckFileExist();
  });

  it('can delete file', async () => {
    await browser.url('/bs');
    await bsact.DeleteFile();
    await bsact.CheckFileDeleting();
  });

  it('can delete bucket', async () => {
    await browser.url('/');
    await dashact.OpenBS();
    await bsact.DeleteBucket();
    await browser.pause(1500);
    await bsact.CheckBucketDelete();
  });

  it('can see success create message', async () => {
    await browser.url('/');
    await dashact.OpenBS();
    await bsact.CreateBucket();
    await bsobj.SuccessIcon.waitForDisplayed();
    const success = await bsobj.Message.getText();
    await assert.equal(success, bsData.SuccessCreated);
  });

  it('can see success delete message', async () => {
    await browser.url('/');
    await dashact.OpenBS();
    await bsact.DeleteBucket();
    await browser.pause(1500);
    await bsobj.SuccessIcon.waitForDisplayed();
    const success = await bsobj.Message.getText();
    await assert.equal(success, bsData.SuccessDeleted);
  });
});
