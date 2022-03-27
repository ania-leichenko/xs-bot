import * as assert from 'assert';

import { RegistrationActions } from '../pa/registration-pa';
import { Dashboard } from '../po/dashboard-po';
import { RegistrationPage } from '../po/registration-po';
import { registerData } from '../test-data/register-data';

const act = new RegistrationActions();
const check = new Dashboard();
const regobj = new RegistrationPage();


describe('User', async () => {
    
    it('can sign up', async () => {
        await browser.url('/');
        await act.SignUp();
        await check.EAM.waitForExist(); //check
        let eamCheck = await check.EAM.isExisting();
        await assert.equal(eamCheck,true);     
    })
    
    it('can sign in as a master', async () => {
        await browser.reloadSession();  
        await browser.url('/');
        await act.SignInAsMaster(registerData.Email, registerData.MasterPassword);
        await check.EAM.waitForExist(); //check
        let eamCheck = await check.EAM.isExisting();
        await assert.equal(eamCheck,true);
    })

    it('can sign in as a worker', async () => {
        await browser.reloadSession();  
        await browser.url('/');
        await act.FillWorkerSignInForm(registerData.TenantNameForWorkerSignIn, registerData.WorkerName, registerData.WorkerPassword);
        await act.Sign();
        await check.EAM.waitForExist(); //check
        let eamCheck = await check.EAM.isExisting();
        await assert.equal(eamCheck,true);
    })

    it('can see error message when tenant name invalid', async () => {
        await browser.reloadSession();  
        await browser.url('/');
        await act.FillWorkerSignInForm(registerData.Incorrect, registerData.WorkerName, registerData.WorkerPassword);
        await act.Sign();
        await regobj.ErrorIcon.waitForDisplayed(); //check
        let errorText = await regobj.ErrorMessage.getText();
        await assert.equal(errorText,registerData.InvalidTenantNameMessage);
    })

    it('can see error message when worker name invalid', async () => {
        await browser.reloadSession();  
        await browser.url('/');
        await act.FillWorkerSignInForm(registerData.TenantNameForWorkerSignIn, registerData.Incorrect, registerData.WorkerPassword);
        await act.Sign();
        await regobj.ErrorIcon.waitForDisplayed(); //check
        let errorText = await regobj.ErrorMessage.getText();
        await assert.equal(errorText,registerData.InvalidWorkerNameMessage);
    })

    it('can see error message when email invalid', async () => {
        await browser.reloadSession();  
        await browser.url('/');
        await act.SignInAsMaster(registerData.IncorrectEmail, registerData.MasterPassword);
        await regobj.ErrorIcon.waitForDisplayed(); //check
        let errorText = await regobj.ErrorMessage.getText();
        await assert.equal(errorText,registerData.InvalidEmailMessage);
    })

    it('can see error message when password invalid', async () => {
        await browser.reloadSession();  
        await browser.url('/');
        await act.SignInAsMaster(registerData.Email, registerData.Incorrect);
        await regobj.ErrorIcon.waitForDisplayed(); //check
        let errorText = await regobj.ErrorMessage.getText();
        await assert.equal(errorText,registerData.InvalidPasswordMessage);
    })

})
