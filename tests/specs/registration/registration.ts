import * as assert from 'assert';
import { RegistrationActions } from '../pa/registration-pa';
import { Dashboard } from '../po/dashboard-po';

const act = new RegistrationActions();
const check = new Dashboard();

describe('User', async () => {
  it('can sign up', async () => {
    await browser.url('/');
    await act.SignUp();
    await act.Sign();
    /////////CHECK//////////
    await check.EAM.waitForExist({
      timeout: 2000,
    });
    const eamCheck = await check.EAM.isExisting();
    await assert.equal(eamCheck, true);
    await browser.reloadSession();
  });

  it('can sign in as a master', async () => {
    await browser.url('/');
    await act.SignInAsMaster();
    await act.Sign();
    /////////CHECK//////////
    await check.EAM.waitForExist({
      timeout: 2000,
    });
    const eamCheck = await check.EAM.isExisting();
    await assert.equal(eamCheck, true);
    await browser.reloadSession();
  });

  it('can sign in as a worker', async () => {
    await browser.url('/');
    await act.FillWorkerSignInForm();
    await act.Sign();
    /////////CHECK//////////
    await check.EAM.waitForExist({
      timeout: 2000,
    });
    const eamCheck = await check.EAM.isExisting();
    await assert.equal(eamCheck, true);
    //        await browser.reloadSession();
  });
});
