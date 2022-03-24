const eam = require('../PO/eam_po');
const eamAct = new eam();

class EAMactions {
    async ChangeTenantName(Name) {
        await eamAct.Name_Field.waitForClickable(2000);
        await eamAct.Name_Field.clearValue();
        await eamAct.Name_Field.setValue(Name)
    }
    async ClickSaveButton() {
        await eamAct.Save_Button.waitForClickable(10000);
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
        await eamAct.Name_Field.setValue(Name);
        await eamAct.Groups[0].scrollIntoView();
        await eamAct.Groups[0].moveTo();
        await eamAct.Groups[0].click();
    }
    async ClickSaveCSV() {
        await eamAct.SaveCSV_Button.waitForExist(5000);
        await eamAct.SaveCSV_Button.scrollIntoView();
        await eamAct.SaveCSV_Button.moveTo();
        await eamAct.SaveCSV_Button.click();
    }
    async FillCreateGroupForm(Name) {
        await eamAct.Name_Field.waitForClickable(2000);
        await eamAct.Name_Field.setValue(Name);
        await eamAct.Permissions[0].scrollIntoView();
        await eamAct.Permissions[0].click();
    }
    async ClickReloadGroupButton() {
        await eamAct.ReloadGroup_Button.waitForExist(8000);
        await eamAct.ReloadGroup_Button.click();
    }
    async ClickDeleteWorkerButton() {
        await eamAct.DeleteWorker_Button.waitForExist(2000);
        await eamAct.DeleteWorker_Button.click();
    }
    async ClickDeleteGroupButton() {
        await eamAct.DeleteGroup_Button.waitForExist(2000);
        await eamAct.DeleteGroup_Button.click();
    }
}

module.exports = EAMactions;
