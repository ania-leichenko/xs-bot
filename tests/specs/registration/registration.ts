const assert = require('assert');
const RegistrationActions = require('../PA/registration_pa');
const act = new RegistrationActions();
const dashboard = require('../PO/dashboard_po');
const check = new dashboard();

describe('User', async () => {
  it('can sign up', async () => {
    await browser.url('/');
    await act.SignUp();
    await act.Sign();
    /////////CHECK//////////
    await check.EAM.waitForExist(2000);
    let eamCheck = await check.EAM.isExisting();
    await assert.equal(eamCheck, true);
    await browser.reloadSession();
  });

  it('can sign in as a master', async () => {
    await browser.url('/');
    await act.SignInAsMaster();
    await act.Sign();
    /////////CHECK//////////
    await check.EAM.waitForExist(2000);
    let eamCheck = await check.EAM.isExisting();
    await assert.equal(eamCheck, true);
    await browser.reloadSession();
  });

  it('can sign in as a worker', async () => {
    await browser.url('/');
    await act.FillWorkerSignInForm();
    await act.Sign();
    /////////CHECK//////////
    await check.EAM.waitForExist(2000);
    let eamCheck = await check.EAM.isExisting();
    await assert.equal(eamCheck, true);
    //        await browser.reloadSession();
  });
});
