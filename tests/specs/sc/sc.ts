import * as assert from 'assert';

import { SC } from '../po/sc-po';
import { SCActions } from '../pa/sc-pa';
import { RegistrationActions } from '../pa/registration-pa';
import { DashboardActions } from '../pa/dashboard-pa';
import { registerData } from '../test-data/register-data';

var dashact = new DashboardActions();
var regact = new RegistrationActions();
var scact = new SCActions();
var scobj = new SC();

describe('Worker', async () => {

    it('can create instance', async () => {
        await browser.url('/');
        await regact.FillWorkerSignInForm(
            registerData.TenantNameForWorkerSignIn, 
            registerData.WorkerName, 
            registerData.WorkerPassword
        );
        await regact.Sign();
        await dashact.OpenSC();
        await scact.CreateInstance();
        await scact.CheckInstanceExist();
    });

    it('can delete instance', async () => {
        await browser.url('/sc');
        await scact.DeleteInstance();
        await scact.CheckInstanceDelete();
    });

})
