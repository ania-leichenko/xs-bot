const registration = require('../PO/registration_po');
const reg = new registration();
const testData = require('../test-data/register-data.json');

class RegistrationActions {
async OpenMasterSignInForm() {
        await reg.SignInAsMaster_Button.waitForClickable(2000);
        await reg.SignInAsMaster_Button.click();
    }
    async OpenWorkerSignInForm() {
        await reg.SignInAsWorker_Button.waitForClickable(2000);
        await reg.SignInAsWorker_Button.click();
    }
    async OpenSignUpForm() {
        await reg.SignUp_Link.waitForClickable(2000);
        await reg.SignUp_Link.click();
    }
    async OpenSignInForm() {
        await reg.SignIn_Link.waitForClickable(2000);
        await reg.SignIn_Link.click();
    }
    async FillMasterSignUpForm() {
        let NewEmail = new Date().getTime() / 1000 + '@test.test';
        await reg.Email_Field.setValue(NewEmail);
        await reg.Name_Field.setValue(testData.TenantName);
        await reg.Password_Field.setValue(testData.MasterPassword);
    }
    async FillMasterSignInForm() {
        await reg.Email_Field.waitForExist(3000);
        await reg.Email_Field.setValue(testData.Email);
        await reg.Password_Field.waitForExist(3000);
        await reg.Password_Field.setValue(testData.MasterPassword);
    }

    async FillWorkerSignInForm() {
        await reg.TenantName_Field.waitForExist(2000);
        await reg.TenantName_Field.setValue(testData.TenantName);
        await reg.WorkerName_Field.waitForExist(2000);
        await reg.WorkerName_Field.setValue(testData.WorkerName);
        await reg.Password_Field.waitForExist(2000);
        await reg.Password_Field.setValue(testData.WorkerPassword);
    }
    async Sign() {
        await reg.Sign_Button.waitForClickable(4000);
        await reg.Sign_Button.moveTo();
        await reg.Sign_Button.click();
    }
    async SignInAsMaster() {
        await this.OpenMasterSignInForm();
        await this.FillMasterSignInForm();
    }
    async SignUp() {
        await this.OpenMasterSignInForm();
        await this.OpenSignUpForm();
        await this.FillMasterSignUpForm();
    }
}

module.exports = RegistrationActions;
