import * as assert from 'assert';
import { RegistrationActions } from '../pa/registration-pa';
import { SLCActions } from '../pa/slc-pa';
import { DashboardActions } from '../pa/dashboard-pa';
import { SLC } from '../po/slc-po';

const registAct = new RegistrationActions();
const slcActions = new SLCActions();
const checkSLC = new DashboardActions();
const slc = new SLC();

describe('MASTER', async () => {
  it('can open slc', async () => {
    await browser.url('/');
    await registAct.SignInAsMaster();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    /////////CHECK/////////////
    const check = await slc.AddFunction_Button.isExisting();
    assert.equal(check, true);
    await browser.reloadSession();
  });

  it('can not create function', async () => {
    await browser.url('/');
    await registAct.SignInAsMaster();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    const [checkBeforeElement] = await slc.LastFunction;
    const checkBefore = await checkBeforeElement.getText();
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    /////////CHECK/////////////
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    const [checkAfterElement] = await slc.LastFunction;
    const checkAfter = await checkAfterElement.getText();
    assert.strictEqual(checkBefore, checkAfter);
    await browser.reloadSession();
  });

  it('can not delete function', async () => {
    await browser.url('/');
    await registAct.SignInAsMaster();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    const [lastElement] = await slc.LastFunction;
    const last = await lastElement.getText();
    await slcActions.ClickDeleteButton();
    /////////CHECK/////////////
    await slcActions.ClickReloadButton();
    const [newLastElement] = await slc.LastFunction;
    const newlast = await newLastElement.getText();
    assert.strictEqual(last, newlast);
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
    const check = await slc.AddFunction_Button.isExisting();
    assert.equal(check, true);
    await browser.reloadSession();
  });

  it('can create function', async () => {
    await browser.url('/');
    await registAct.FillWorkerSignInForm();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    /////////CHECK/////////////
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    const [checkElement] = await slc.LastFunction;
    const check = await checkElement.getText();
    assert.strictEqual(check, NewFunction);
    await browser.reloadSession();
  });

  it('can delete function', async () => {
    await browser.url('/');
    await registAct.FillWorkerSignInForm();
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slcActions.ClickReloadButton();
    const [, , , , lastElement] = await slc.LastFunction;
    const last = await lastElement.getText();
    await slcActions.ClickDeleteButton();
    /////////CHECK/////////////
    await slcActions.ClickReloadButton();
    const [newLastElement] = await slc.LastFunction;
    const newlast = await newLastElement.getText();
    assert.strictEqual(last, newlast);
    await browser.reloadSession();
  });
});
