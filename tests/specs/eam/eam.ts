import * as asserteam from 'assert';
import { RegistrationActions } from '../pa/registration-pa';
import { EAMActions } from '../pa/eam-pa';
import { DashboardActions } from '../pa/dashboard-pa';
import { registerData } from '../test-data/register-data';
import { eamData } from '../test-data/eam-data';
import { EAM } from '../po/eam-po';

const regAct = new RegistrationActions();
const eamActions = new EAMActions();
const checkEAM = new DashboardActions();
const eam = new EAM();

describe('MASTER', async () => {
  beforeEach(async () => {
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
  });
  afterEach(async () => {
    await browser.reloadSession();
  });
  after(async () => {
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.ClickDeleteWorkerButton();
    await eamActions.ClickDeleteWorkerButton();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await browser.refresh();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await browser.reloadSession();
  });
  it('can open eam', async () => {
    /////////CHECK/////////////
    const check = await eam.AddWorker_Button.isExisting();
    asserteam.equal(check, true);
  });
  it('can change tenant name', async () => {
    await eamActions.ChangeTenantName(registerData.NewTenantName);
    await eamActions.ClickSaveButton();
    await browser.refresh();
    /////////CHECK and return previous value/////////////
    const check = await eam.Name_Field.getValue();
    asserteam.strictEqual(check, registerData.NewTenantName);
    await eamActions.ChangeTenantName(registerData.TenantName);
    await eamActions.ClickSaveButton();
  });
  it('can see success message when change tenant name', async () => {
    await eamActions.ChangeTenantName(registerData.NewTenantName);
    await eamActions.ClickSaveButton();
    /////////CHECK and return previous value/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessTenantChange);
    await eamActions.ChangeTenantName(registerData.TenantName);
    await eamActions.ClickSaveButton();
  });
  it('can see error message when change tenant name to existing one', async () => {
    await eamActions.ChangeTenantName(registerData.TenantName);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    await eam.Error_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.ErrorTenantChange);
  });
  it('can not change tenant name to existing one', async () => {
    const last = await eam.Name_Field.getValue();
    await eamActions.ChangeTenantName(registerData.TenantName);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    const newlast = await eam.Name_Field.getValue();
    asserteam.strictEqual(last, newlast);
  });
  it('can create worker', async () => {
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    await eamActions.ClickSaveCSV();
    /////////CHECK/////////////
    await checkEAM.OpenEAM();
    await browser.pause(1000);
    const [checkElement] = await eam.LastWorker;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewWorker);
  });
  it('can see success message when create worker', async () => {
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessWorkerCreate);
  });
  it('can not create worker without adding him to some group', async () => {
    await browser.pause(1000);
    const [lastElement] = await eam.LastWorker;
    const last = await lastElement.getText();
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerWithoutGroupForm(NewWorker);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    await checkEAM.OpenEAM();
    await browser.pause(1000);
    const [newlastElement] = await eam.LastWorker;
    const newlast = await newlastElement.getText();
    asserteam.strictEqual(last, newlast);
  });
  it('can see error message when create worker without adding him to some group', async () => {
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerWithoutGroupForm(NewWorker);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    await eam.Error_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.ErrorWorkerCreate);
  });
  it('can delete worker', async () => {
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    await checkEAM.OpenEAM();
    await browser.pause(2000);
    const [, , , , lastElement] = await eam.LastWorker;
    const second = await lastElement.getText();
    await eamActions.ClickDeleteWorkerButton();
    /////////CHECK/////////////
    await browser.pause(1000);
    const [LastElement] = await eam.LastWorker;
    const last = await LastElement.getText();
    asserteam.strictEqual(second, last);
  });
  it('can see success message when delete worker', async () => {
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    await checkEAM.OpenEAM();
    await eamActions.ClickDeleteWorkerButton();
    /////////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 8000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessWorkerDelete);
  });
  it('can create group', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await browser.pause(1000);
    const [checkElement] = await eam.LastGroup;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewGroup);
  });
  it('can see success message when create group', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupCreate);
  });
  it('can not create group without permissions', async () => {
    await browser.pause(1000);
    const [lastElement] = await eam.LastGroup;
    const last = await lastElement.getText();
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithoutPermissionsForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await checkEAM.OpenEAM();
    await browser.pause(1000);
    const [newlastElement] = await eam.LastGroup;
    const newlast = await newlastElement.getText();
    asserteam.strictEqual(last, newlast);
  });
  it('can see error message when create group without permissions', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithoutPermissionsForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eam.Error_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.ErrorGroupCreate);
  });
  it('can create group with workers', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithWorkersForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await browser.pause(1000);
    const [checkElement] = await eam.LastGroup;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewGroup);
  });
  it('can delete empty group', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(1000);
    const [, , , , , lastElement] = await eam.LastGroup;
    const second = await lastElement.getText();
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await browser.pause(1000);
    const [LastElement] = await eam.LastGroup;
    const last = await LastElement.getText();
    asserteam.strictEqual(second, last);
  });
  it('can see success message when delete empty group', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(2000);
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 6000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupDelete);
  });
  it('can not delete group with workers', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithWorkersForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(1000);
    const [lastElement] = await eam.LastGroup;
    const last = await lastElement.getText();
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await browser.pause(1000);
    const [newLastElement] = await eam.LastGroup;
    const newlast = await newLastElement.getText();
    asserteam.strictEqual(last, newlast);
  });
  it('can see error message when delete group with workers', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithWorkersForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(2000);
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await eam.Error_Icon.waitForDisplayed({
      timeout: 6000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.ErrorGroupDelete);
  });
  it('can edit group name', async () => {
    await eamActions.ClickEditGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithoutPermissionsForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await browser.pause(1000);
    const [checkElement] = await eam.LastGroup;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewGroup);
  });
  it('can see success message when edit group name', async () => {
    await eamActions.ClickEditGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithoutPermissionsForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await browser.pause(1000);
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupEdit);
  });
  it('can see success message when edit workers in the group', async () => {
    await eamActions.ClickEditGroupButton();
    await eamActions.FillEditWorkersInTheGroupForm();
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupEdit);
  });
  it('can see success message when edit group permissions', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(1000);
    await eamActions.ClickEditGroupButton();
    await eamActions.FillEditGroupPermissionsForm();
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupEdit);
  });
});

describe('WORKER', async () => {
  beforeEach(async () => {
    await browser.url('/');
    await regAct.FillWorkerSignInForm();
    await regAct.Sign();
    await checkEAM.OpenEAM();
  });
  afterEach(async () => {
    await browser.reloadSession();
  });
  after(async () => {
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.ClickDeleteWorkerButton();
    await eamActions.ClickDeleteWorkerButton();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await browser.refresh();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await eamActions.ClickDeleteGroupButton();
    await browser.reloadSession();
  });
  it('can open eam', async () => {
    /////////CHECK/////////////
    const check = await eam.AddWorker_Button.isExisting();
    asserteam.equal(check, true);
  });
  it('can change tenant name', async () => {
    await eamActions.ChangeTenantName(registerData.NewTenantName);
    await eamActions.ClickSaveButton();
    await browser.refresh();
    /////////CHECK and return previous value/////////////
    const check = await eam.Name_Field.getValue();
    asserteam.strictEqual(check, registerData.NewTenantName);
    await eamActions.ChangeTenantName(registerData.TenantName);
    await eamActions.ClickSaveButton();
  });
  it('can see success message when change tenant name', async () => {
    await eamActions.ChangeTenantName(registerData.NewTenantName);
    await eamActions.ClickSaveButton();
    /////////CHECK and return previous value/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessTenantChange);
    await eamActions.ChangeTenantName(registerData.TenantName);
    await eamActions.ClickSaveButton();
  });
  it('can see error message when change tenant name to existing one', async () => {
    await eamActions.ChangeTenantName(registerData.TenantName);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    await eam.Error_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.ErrorTenantChange);
  });
  it('can not change tenant name to existing one', async () => {
    const last = await eam.Name_Field.getValue();
    await eamActions.ChangeTenantName(registerData.TenantName);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    const newlast = await eam.Name_Field.getValue();
    asserteam.strictEqual(last, newlast);
  });
  it('can create worker', async () => {
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    await eamActions.ClickSaveCSV();
    /////////CHECK/////////////
    await checkEAM.OpenEAM();
    await browser.pause(1000);
    const [checkElement] = await eam.LastWorker;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewWorker);
  });
  it('can see success message when create worker', async () => {
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessWorkerCreate);
  });
  it('can not create worker without adding him to some group', async () => {
    await browser.pause(1000);
    const [lastElement] = await eam.LastWorker;
    const last = await lastElement.getText();
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerWithoutGroupForm(NewWorker);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    await checkEAM.OpenEAM();
    await browser.pause(1000);
    const [newlastElement] = await eam.LastWorker;
    const newlast = await newlastElement.getText();
    asserteam.strictEqual(last, newlast);
  });
  it('can see error message when create worker without adding him to some group', async () => {
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerWithoutGroupForm(NewWorker);
    await eamActions.ClickSaveButton();
    /////////CHECK/////////////
    await eam.Error_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.ErrorWorkerCreate);
  });
  it('can not delete worker', async () => {
    await browser.pause(1000);
    const [lastElement] = await eam.LastWorker;
    const last = await lastElement.getText();
    await eamActions.ClickDeleteWorkerButton();
    /////////CHECK/////////////
    await browser.pause(1000);
    const [newLastElement] = await eam.LastWorker;
    const newlast = await newLastElement.getText();
    asserteam.strictEqual(last, newlast);
  });
  it('can see error message when delete worker', async () => {
    await eamActions.ClickDeleteWorkerButton();
    /////////CHECK/////////////
    await eam.Error_Icon.waitForDisplayed({
      timeout: 8000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.ErrorWorkerDelete);
  });
  it('can create group', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await browser.pause(1000);
    const [checkElement] = await eam.LastGroup;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewGroup);
  });
  it('can see success message when create group', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupCreate);
  });
  it('can not create group without permissions', async () => {
    await browser.pause(1000);
    const [lastElement] = await eam.LastGroup;
    const last = await lastElement.getText();
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithoutPermissionsForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await checkEAM.OpenEAM();
    await browser.pause(1000);
    const [newlastElement] = await eam.LastGroup;
    const newlast = await newlastElement.getText();
    asserteam.strictEqual(last, newlast);
  });
  it('can see error message when create group without permissions', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithoutPermissionsForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eam.Error_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.ErrorGroupCreate);
  });
  it('can create group with workers', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithWorkersForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await browser.pause(1000);
    const [checkElement] = await eam.LastGroup;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewGroup);
  });
  it('can delete empty group', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(1000);
    const [, , , , , lastElement] = await eam.LastGroup;
    const second = await lastElement.getText();
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await browser.pause(1000);
    const [LastElement] = await eam.LastGroup;
    const last = await LastElement.getText();
    asserteam.strictEqual(second, last);
  });
  it('can see success message when delete empty group', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(2000);
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 6000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupDelete);
  });
  it('can not delete group with workers', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithWorkersForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(1000);
    const [lastElement] = await eam.LastGroup;
    const last = await lastElement.getText();
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await browser.pause(1000);
    const [newLastElement] = await eam.LastGroup;
    const newlast = await newLastElement.getText();
    asserteam.strictEqual(last, newlast);
  });
  it('can see error message when delete group with workers', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithWorkersForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(2000);
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await eam.Error_Icon.waitForDisplayed({
      timeout: 6000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.ErrorGroupDelete);
  });
  it('can edit group name', async () => {
    await eamActions.ClickEditGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithoutPermissionsForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await browser.pause(1000);
    const [checkElement] = await eam.LastGroup;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewGroup);
  });
  it('can see success message when edit group name', async () => {
    await eamActions.ClickEditGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupWithoutPermissionsForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupEdit);
  });
  it('can see success message when edit workers in the group', async () => {
    await eamActions.ClickEditGroupButton();
    await eamActions.FillEditWorkersInTheGroupForm();
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupEdit);
  });
  it('can see success message when edit group permissions', async () => {
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    await browser.pause(1000);
    await eamActions.ClickEditGroupButton();
    await eamActions.FillEditGroupPermissionsForm();
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eam.Success_Icon.waitForDisplayed({
      timeout: 3000,
    });
    const check = await eam.Message.getText();
    asserteam.strictEqual(check, eamData.SuccessGroupEdit);
  });
});
