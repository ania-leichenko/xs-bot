const { browser } = require('webdriverio');
const asserteam = require('assert');
const RegisterActions = require('../PA/registration_pa');
const regAct = new RegisterActions();
const eamAct = require('../PA/eam_pa');
const eamActions = new eamAct();
const dashB = require('../PA/dashboard_pa');
const checkEAM = new dashB();
const testData = require('../test-data/register-data.json');
const eam = require('../PO/eam_po');
const EAM = new eam();

describe('MASTER', async () => {
  // const browser = await remote({
  //     capabilities: {
  //         browserName: 'chrome'
  //     }
  // })

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
    let check = await EAM.Name_Field.getValue();
    asserteam.strictEqual(check, testData.NewTenantName);
    await eamActions.ChangeTenantName(testData.TenantName);
    await eamActions.ClickSaveButton();
    await browser.reloadSession();
  });
  // it('can add worker', async () => {
  //     await browser.url('/');
  //     await regAct.SignInAsMaster();
  //     await regAct.Sign();
  //     await checkEAM.OpenEAM();

  //     await eamActions.AddWorkerButton();
  //     let NewWorker = new Date().getTime() / 1000 + 'dev';
  //     await eamActions.FillCreateWorkerForm(NewWorker);
  //     await eamActions.ClickSaveButton();
  //     await eamActions.ClickSaveCSV();
  //     /////////CHECK/////////////
  //     await checkEAM.OpenEAM();
  //     let check = await (EAM.LastWorker)[0].getText()
  //     asserteam.strictEqual(check,NewWorker);
  //     await browser.reloadSession();

  // })

  //     it('can add group', async () => {
  //         await browser.url('/');
  //         await regAct.SignInAsMaster();
  //         await regAct.Sign();
  //         await checkEAM.OpenEAM();
  //         let table = (EAM.Table).getText();
  //   const elem = $$('//div[@class="styles_tableContainer__q-U43"])')[1].$('//table/tbody/tr/td');
  //         console.log(elem.getText())
  //         console.log(table + 'FROG')
  // await eamActions.AddGroupButton();
  // let NewGroup = new Date().getTime() / 1000 + 'group';
  // await eamActions.FillCreateGroupForm(NewGroup);
  // await eamActions.ClickSaveButton();
  // /////////CHECK/////////////
  // await checkEAM.OpenEAM();
  // let check = await (EAM.LastWorker)[0].getText()
  // asserteam.strictEqual(check,NewGroup);
  // await browser.reloadSession();

  // })
});

// describe('WORKER', async () => {

//     it('can change tenant name', async () => {
//         await browser.url('/');
//         await regAct.FillWorkerSignInForm();
//         await regAct.Sign();
//         await checkEAM.OpenEAM();
//         await eamActions.ChangeTenantName(testData.NewTenantName);
//         await eamActions.ClickSaveButton() ;

//         await browser.reloadSession();
//         await browser.url('/');
//         await regAct.SignInAsMaster();
//         await regAct.Sign();
//         await checkEAM.OpenEAM();
//         /////////CHECK and return previous value/////////////
//         let check = await EAM.Name_Field.getValue()
//         asserteam.strictEqual(check,testData.NewTenantName);
//         await eamActions.ChangeTenantName(testData.TenantName);
//         await eamActions.ClickSaveButton()
//         await browser.reloadSession();

//      })

//     it('can create worker', async () => {
//         await browser.url('/');
//         await regAct.FillWorkerSignInForm();
//         await regAct.Sign();
//         await checkEAM.OpenEAM();

//         await eamActions.AddWorkerButton();
//         let NewWorker = new Date().getTime() / 1000 + 'dev';
//         await eamActions.FillCreateWorkerForm(NewWorker);
//         await eamActions.ClickSaveButton();
//         await eamActions.ClickSaveCSV();
//         /////////CHECK/////////////
//         await checkEAM.OpenEAM();
//         let check = await (EAM.LastWorker)[0].getText()
//         asserteam.strictEqual(check,NewWorker);
//         await browser.reloadSession();

//      })
// })
