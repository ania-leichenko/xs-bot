import * as assert from 'assert';
import { RegistrationActions } from '../pa/registration-pa';
import { SLCActions } from '../pa/slc-pa';
import { DashboardActions } from '../pa/dashboard-pa';
import { SLC } from '../po/slc-po';
import { slcData } from '../test-data/slc-data';
import { registerData } from '../test-data/register-data';

const registAct = new RegistrationActions();
const slcActions = new SLCActions();
const checkSLC = new DashboardActions();
const slc = new SLC();

describe('MASTER', async () => {
  before(async () => {
    await browser.url('/');
    await registAct.FillWorkerSignInForm(
      registerData.TenantName,
      registerData.WorkerName,
      registerData.WorkerPassword,
    );
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    await browser.reloadSession();
  });
  beforeEach(async () => {
    await browser.url('/');
    await registAct.SignInAsMaster(
      registerData.Email,
      registerData.MasterPassword,
    );
    await checkSLC.OpenSLC();
  });
  afterEach(async () => {
    await browser.reloadSession();
  });
  after(async () => {
    await browser.url('/');
    await registAct.FillWorkerSignInForm(
      registerData.TenantName,
      registerData.WorkerName,
      registerData.WorkerPassword,
    );
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slc.Functions_Table.waitForExist({
      timeout: 2000,
    });
    await slcActions.ClickDeleteButton();
    await browser.reloadSession();
  });
  it('can open slc', async () => {
    const check = await slc.AddFunction_Button.isExisting();
    assert.equal(check, true);
  });
  it('can not create function', async () => {
    await slc.Functions_Table.waitForExist({
      timeout: 2000,
    });
    const [checkBeforeElement] = await slc.LastFunction;
    const checkBefore = await checkBeforeElement.getText();
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    await checkSLC.OpenSLC();
    await slc.Functions_Table.waitForExist({
      timeout: 4000,
    });
    const [checkAfterElement] = await slc.LastFunction;
    const checkAfter = await checkAfterElement.getText();
    assert.strictEqual(checkBefore, checkAfter);
  });
  it('can see error message when create function', async () => {
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    await slc.Error_Message.waitForDisplayed({
      timeout: 3000,
    });
    const check = await slc.Error_Message.getText();
    assert.strictEqual(check, slcData.Error_Master);
  });
  it('can not delete function', async () => {
    await slc.Functions_Table.waitForExist({
      timeout: 2000,
    });
    const [lastElement] = await slc.LastFunction;
    const last = await lastElement.getText();
    await slcActions.ClickDeleteButton();
    await slc.Functions_Table.waitForExist({
      timeout: 2000,
    });
    const [newLastElement] = await slc.LastFunction;
    const newlast = await newLastElement.getText();
    assert.strictEqual(last, newlast);
  });
  it('can see error message when delete function', async () => {
    await slc.Functions_Table.waitForExist({
      timeout: 2000,
    });
    await slcActions.ClickDeleteButton();
    await slc.Error_Message.waitForDisplayed({
      timeout: 3000,
    });
    const check = await slc.Error_Message.getText();
    assert.strictEqual(check, slcData.Error_Master);
  });
  it('can not edit function', async () => {
    await slcActions.ClickEditButton();
    await slcActions.FillTextBox();
    await slcActions.ClickSaveFunctionButton();
    await browser.refresh();
    await slc.Text_Box.waitForExist({
      timeout: 2000,
    });
    const code = await slc.Text_Box.getText();
    assert.match(code, /Hello from BWS!/);
  });
  it('can see error message when edit function', async () => {
    await slcActions.ClickEditButton();
    await slcActions.FillTextBox();
    await slcActions.ClickSaveFunctionButton();
    await slc.Error_Message.waitForDisplayed({
      timeout: 3000,
    });
    const check = await slc.Error_Message.getText();
    assert.strictEqual(check, slcData.Error_Master);
  });
  it('can not run function', async () => {
    await slcActions.ClickEditButton();
    await slcActions.ClickRunFunctionButton();
    await slcActions.FillFunctionArguments();
    const check = await slc.Function_Arguments.isDisplayed();
    assert.equal(check, true);
  });
  it('can see error message when run function', async () => {
    await slcActions.ClickEditButton();
    await slcActions.ClickRunFunctionButton();
    await slcActions.FillFunctionArguments();
    await slc.Error_Message.waitForDisplayed({
      timeout: 3000,
    });
    const check = await slc.Error_Message.getText();
    assert.strictEqual(check, slcData.Error_Master);
  });
});

describe('WORKER', async () => {
  beforeEach(async () => {
    await browser.url('/');
    await registAct.FillWorkerSignInForm(
      registerData.TenantName,
      registerData.WorkerName,
      registerData.WorkerPassword,
    );
    await registAct.Sign();
    await checkSLC.OpenSLC();
  });
  afterEach(async () => {
    await browser.reloadSession();
  });
  after(async () => {
    await browser.url('/');
    await registAct.FillWorkerSignInForm(
      registerData.TenantName,
      registerData.WorkerName,
      registerData.WorkerPassword,
    );
    await registAct.Sign();
    await checkSLC.OpenSLC();
    await slc.Functions_Table.waitForExist({
      timeout: 2000,
    });
    await slcActions.ClickDeleteButton();
    await slcActions.ClickDeleteButton();
    await slcActions.ClickDeleteButton();
    await slcActions.ClickDeleteButton();
    await browser.reloadSession();
  });
  it('can open slc', async () => {
    const check = await slc.AddFunction_Button.isExisting();
    assert.equal(check, true);
  });
  it('can create function', async () => {
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    await slc.Functions_Table.waitForExist({
      timeout: 4000,
    });
    const [checkElement] = await slc.LastFunction;
    const check = await checkElement.getText();
    assert.strictEqual(check, NewFunction);
  });
  it('can see success message when create function', async () => {
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    await slc.Success_Message.waitForDisplayed({
      timeout: 3000,
    });
    const check = await slc.Success_Message.getText();
    assert.strictEqual(check, slcData.SuccessFunctionCreate);
  });
  it('can delete function', async () => {
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    await slc.Functions_Table.waitForExist({
      timeout: 4000,
    });
    const [, , , , lastElement] = await slc.LastFunction;
    const last = await lastElement.getText();
    await slcActions.ClickDeleteButton();
    await slc.Functions_Table.waitForExist({
      timeout: 2000,
    });
    const [newLastElement] = await slc.LastFunction;
    const newlast = await newLastElement.getText();
    assert.strictEqual(last, newlast);
  });
  it('can see success message when delete function', async () => {
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    await slc.Functions_Table.waitForExist({
      timeout: 2000,
    });
    await browser.refresh();
    await slcActions.ClickDeleteButton();
    await slc.Success_Message.waitForDisplayed({
      timeout: 3000,
    });
    const check = await slc.Success_Message.getText();
    assert.strictEqual(check, slcData.SuccessFunctionDelete);
  });
  it('can edit function', async () => {
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    await slcActions.ClickEditButton();
    await slcActions.FillTextBox();
    await slcActions.ClickSaveFunctionButton();
    await browser.refresh();
    await slc.Text_Box.waitForExist({
      timeout: 2000,
    });
    const code = await slc.Text_Box.getText();
    assert.strictEqual(code, slcData.FunctionCode);
  });
  it('can run function', async () => {
    await slcActions.AddFunctionButton();
    const NewFunction = new Date().getTime() + 'func';
    await slcActions.FillCreateFunctionForm(NewFunction);
    await slcActions.ClickSaveButton();
    await slcActions.ClickEditButton();
    await slcActions.FillTextBox();
    await slcActions.ClickSaveFunctionButton();
    await slcActions.ClickRunFunctionButton();
    await slcActions.FillFunctionArguments();
    await slc.Function_Response.waitForExist({
      timeout: 6000,
    });
    const code = await slc.Function_Response.getText();
    assert.strictEqual(code, slcData.ExpectedResponse);
  });
});
