import * as assert from 'assert';

import { SC } from '../po/sc-po';
import { SCActions } from '../pa/sc-pa';
import { RegistrationActions } from '../pa/registration-pa';
import { DashboardActions } from '../pa/dashboard-pa';
import { registerData } from '../test-data/register-data';
import { scData } from '../test-data/sc-data';

const dashact = new DashboardActions();
const regact = new RegistrationActions();
const scact = new SCActions();
const scobj = new SC();

describe('Worker', async () => {

    it('can create instance', async () => {
        await browser.url('/');
        await regact.FillWorkerSignInForm(
            registerData.TenantNameForWorkerSignIn,
            registerData.WorkerName,
            registerData.WorkerPassword,
        );
        await regact.Sign();
        await dashact.OpenSC();
        await scact.CreateInstance();
        await scact.CheckInstanceExist();
    });

    it('can change instance name', async () => {
        await browser.url('/sc');
        await scact.ChangeName(scData.NewInstanceName);
        await scact.CheckChangeName(scData.NewInstanceName);
        await scact.ChangeName(scData.InstanceName);
    });

    it('can delete instance', async () => {
        await browser.url('/sc');
        await scact.DeleteInstance();
        await scact.CheckInstanceDelete();
    });

    it('can see success create message', async () => {
        await browser.url('/sc');
        await scact.CreateInstance();
        await scobj.SuccessIcon.waitForDisplayed();
        const success = await scobj.Message.getText();
        assert.equal(success,scData.SuccessCreated);
    });

    it('can see success delete message', async () => {
        await browser.url('/sc');
        await scact.DeleteInstance();
        await scobj.SuccessIcon.waitForDisplayed();
        const success = await scobj.Message.getText();
        assert.equal(success,scData.SuccessDeleted);
    });

});
