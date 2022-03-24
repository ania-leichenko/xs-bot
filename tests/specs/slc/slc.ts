//const { browser } = require('webdriverio');
const assertslc = require('assert');
const RegActions = require('../PA/registration_pa');
const registAct = new RegActions();
const slcAct = require('../PA/slc_pa');
const slcActions = new slcAct();
const DashB = require('../PA/dashboard_pa');
const checkSLC = new DashB();
const slc = require('../PO/slc_po');
const SLC = new slc();

describe('MASTER', async () => {
  it('can open slc', async () => {
    await browser.url('/');
    await registAct.SignInAsMaster();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    /////////CHECK/////////////
    let check = await SLC.AddFunction_Button.isExisting();
    assertslc.equal(check, true);
    await browser.reloadSession();
  });
  it('can not create function', async () => {
    await browser.url('/');
    await registAct.SignInAsMaster();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    let checkBefore = await SLC.LastFunction[0].getText();
    await slcActions.AddFunctionButton();
    let NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    /////////CHECK/////////////
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    let checkAfter = await SLC.LastFunction[0].getText();
    assertslc.strictEqual(checkBefore, checkAfter);
    await browser.reloadSession();
  });
  it('can not delete function', async () => {
    await browser.url('/');
    await registAct.SignInAsMaster();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    let last = await SLC.LastFunction[0].getText();
    await slcActions.ClickDeleteButton();
    /////////CHECK/////////////
    await slcActions.ClickReloadButton();
    let newlast = await SLC.LastFunction[0].getText();
    assertslc.strictEqual(last, newlast);
    await browser.reloadSession();
  });
});
describe('WORKER', async () => {
  it('can open slc', async () => {
    await browser.url('/');
    await registAct.FillWorkerSignInForm();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    /////////CHECK/////////////
    let check = await SLC.AddFunction_Button.isExisting();
    assertslc.equal(check, true);
    await browser.reloadSession();
  });
  it('can create function', async () => {
    await browser.url('/');
    await registAct.FillWorkerSignInForm();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slcActions.AddFunctionButton();
    let NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    /////////CHECK/////////////
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    let check = await SLC.LastFunction[0].getText();
    assertslc.strictEqual(check, NewFunction);
    await browser.reloadSession();
  });
  it('can delete function', async () => {
    await browser.url('/');
    await registAct.FillWorkerSignInForm();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    let last = await SLC.LastFunction[4].getText();
    await slcActions.ClickDeleteButton();
    /////////CHECK/////////////
    await slcActions.ClickReloadButton();
    let newlast = await SLC.LastFunction[0].getText();
    assertslc.strictEqual(last, newlast);
    await browser.reloadSession();
  });
});
