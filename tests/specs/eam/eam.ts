import * as asserteam from 'assert';
import { RegistrationActions } from '../pa/registration-pa';
import { EAMActions } from '../pa/eam-pa';
import { DashboardActions } from '../pa/dashboard-pa';
import * as testData from '../test-data/register-data.json' assert { type: 'json' };
import { EAM } from '../po/eam-po';

const regAct = new RegistrationActions();
const eamActions = new EAMActions();
const checkEAM = new DashboardActions();
const eam = new EAM();

describe('MASTER', async () => {
  it('can open eam', async () => {
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    /////////CHECK/////////////
    const check = await eam.AddWorker_Button.isExisting();
    asserteam.equal(check, true);
    await browser.reloadSession();
  });
  it('can change tenant name', async () => {
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.ChangeTenantName(testData.NewTenantName);
    await eamActions.ClickSaveButton();
    await browser.reloadSession();
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    /////////CHECK and return previous value/////////////
    const check = await eam.Name_Field.getValue();
    asserteam.strictEqual(check, testData.NewTenantName);
    await eamActions.ChangeTenantName(testData.TenantName);
    await eamActions.ClickSaveButton();
    await browser.reloadSession();
  });
  it('can create worker', async () => {
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    await eamActions.ClickSaveCSV();
    /////////CHECK/////////////
    await checkEAM.OpenEAM();
    const [checkElement] = await eam.LastWorker;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewWorker);
    await browser.reloadSession();
  });
  it('can create group', async () => {
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eamActions.ClickReloadGroupButton();
    const [checkElement] = await eam.LastGroup;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewGroup);
    await browser.reloadSession();
  });
  it('can delete empty group', async () => {
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.ClickReloadGroupButton();
    const [, , , , , laseElement] = await eam.LastGroup;
    const last = await laseElement.getText();
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await eamActions.ClickReloadGroupButton();
    const [newLastElement] = await eam.LastGroup;
    const newlast = await newLastElement.getText();
    asserteam.strictEqual(last, newlast);
    await browser.reloadSession();
  });
  it('can not delete group with workers', async () => {
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    await checkEAM.OpenEAM();
    await eamActions.ClickReloadGroupButton();
    const [lastElement] = await eam.LastGroup;
    const last = await lastElement.getText();
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await eamActions.ClickReloadGroupButton();
    const [newLastElement] = await eam.LastGroup;
    const newlast = await newLastElement.getText();
    asserteam.strictEqual(last, newlast);
    await browser.reloadSession();
  });
});

describe('WORKER', async () => {
  it('can open eam', async () => {
    await browser.url('/');
    await regAct.FillWorkerSignInForm();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    /////////CHECK/////////////
    const check = await eam.AddWorker_Button.isExisting();
    asserteam.equal(check, true);
    await browser.reloadSession();
  });
  it('can change tenant name', async () => {
    await browser.url('/');
    await regAct.FillWorkerSignInForm();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.ChangeTenantName(testData.NewTenantName);
    await eamActions.ClickSaveButton();
    await browser.reloadSession();
    await browser.url('/');
    await regAct.SignInAsMaster();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    /////////CHECK and return previous value/////////////
    const check = await eam.Name_Field.getValue();
    asserteam.strictEqual(check, testData.NewTenantName);
    await eamActions.ChangeTenantName(testData.TenantName);
    await eamActions.ClickSaveButton();
    await browser.reloadSession();
  });
  it('can create worker', async () => {
    await browser.url('/');
    await regAct.FillWorkerSignInForm();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    await eamActions.ClickSaveCSV();
    /////////CHECK/////////////
    await checkEAM.OpenEAM();
    const [checkElement] = await eam.LastWorker;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewWorker);
    await browser.reloadSession();
  });
  it('can create group', async () => {
    await browser.url('/');
    await regAct.FillWorkerSignInForm();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.AddGroupButton();
    const NewGroup = new Date().getTime() / 1000 + 'group';
    await eamActions.FillCreateGroupForm(NewGroup);
    await eamActions.ClickSaveButton();
    ///////CHECK/////////////
    await eamActions.ClickReloadGroupButton();
    const [checkElement] = await eam.LastGroup;
    const check = await checkElement.getText();
    asserteam.strictEqual(check, NewGroup);
    await browser.reloadSession();
  });
  it('can delete empty group', async () => {
    await browser.url('/');
    await regAct.FillWorkerSignInForm();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.ClickReloadGroupButton();
    const [, , , , , lastElement] = await eam.LastGroup;
    const last = lastElement.getText();
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await eamActions.ClickReloadGroupButton();
    const [newLastElement] = await eam.LastGroup;
    const newlast = await newLastElement.getText();
    asserteam.strictEqual(last, newlast);
    await browser.reloadSession();
  });
  it('can not delete group with workers', async () => {
    await browser.url('/');
    await regAct.FillWorkerSignInForm();
    await regAct.Sign();
    await checkEAM.OpenEAM();
    await eamActions.AddWorkerButton();
    const NewWorker = new Date().getTime() / 1000 + 'dev';
    await eamActions.FillCreateWorkerForm(NewWorker);
    await eamActions.ClickSaveButton();
    await checkEAM.OpenEAM();
    await eamActions.ClickReloadGroupButton();
    const [lastElement] = await eam.LastGroup;
    const last = lastElement.getText();
    await eamActions.ClickDeleteGroupButton();
    /////////CHECK/////////////
    await eamActions.ClickReloadGroupButton();
    const [newLastElement] = await eam.LastGroup;
    const newlast = await newLastElement.getText();
    asserteam.strictEqual(last, newlast);
    await browser.reloadSession();
  });
});
