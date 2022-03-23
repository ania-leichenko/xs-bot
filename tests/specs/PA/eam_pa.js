const eam = require('../PO/eam_po');
const eamAct = new eam();
//const testData = require('../test-data/register-data.json');

class EAMactions {

    // async GetTenantName() {
    //     await eamAct.Name_Field.waitForClickable(2000);
    //     await eamAct.Name_Field.getValue();
    // }
    async ChangeTenantName(Name) {
        await eamAct.Name_Field.waitForClickable(2000);
        await eamAct.Name_Field.clearValue();
        await eamAct.Name_Field.setValue(Name)
    }
    async ClickSaveButton() {
        await eamAct.Save_Button.waitForExist(5000);
        await eamAct.Save_Button.moveTo();
        await eamAct.Save_Button.click();
    }

    async AddWorkerButton() {
        await eamAct.AddWorker_Button.waitForClickable(2000);
        await eamAct.AddWorker_Button.click();
    }
    async AddGroupButton() {
        await eamAct.AddGroup_Button.waitForClickable(2000);
        await eamAct.AddGroup_Button.click();
    }
    async FillCreateWorkerForm(Name) {
        await eamAct.Name_Field.waitForClickable(2000);
        await eamAct.Name_Field.setValue(Name)
        await eamAct.Groups[0].scrollIntoView()
        await eamAct.Groups[0].moveTo()
        await eamAct.Groups[0].click()
    }
    async ClickSaveCSV() {
        await eamAct.SaveCSV_Button.waitForExist(5000);
        await eamAct.SaveCSV_Button.scrollIntoView();
        await eamAct.SaveCSV_Button.moveTo();
        await eamAct.SaveCSV_Button.click();
    }

    async FillCreateGroupForm(Name) {
        await eamAct.Name_Field.waitForClickable(2000);
        await eamAct.Name_Field.setValue(Name)
        await eamAct.Permissions[0].scrollIntoView()
        await eamAct.Permissions[0].moveTo()
        await eamAct.Permissions[0].click()
    }

    async DeleteWorkerButton() {
        await reg.Sign_Button.waitForClickable(4000);
        await reg.Sign_Button.moveTo();
        await reg.Sign_Button.click();
    }
    async DeleteGroupButton() {
        await this.OpenMasterSignInForm();
        await this.FillMasterSignInForm();
    }
    async SignUp() {
        await this.OpenMasterSignInForm();
        await this.OpenSignUpForm();
        await this.FillMasterSignUpForm();
    }
}

module.exports = EAMactions;
