const slc = require('../PO/slc_po');
const slcAct = new slc();

class SLCactions {
    async ClickSaveButton() {
        await slcAct.Save_Button.waitForExist(5000);
        await slcAct.Save_Button.moveTo();
        await slcAct.Save_Button.click();
    }
    async AddFunctionButton() {
        await slcAct.AddFunction_Button.waitForClickable(2000);
        await slcAct.AddFunction_Button.click();
    }
    async FillCreateFunctionForm(Name) {
        await slcAct.Name_Field.waitForClickable(2000);
        await slcAct.Name_Field.setValue(Name)
    }
    async ClickDeleteButton() {
        await slcAct.Delete_Button.waitForExist(4000);
        await slcAct.Delete_Button.click();
    }
    async ClickReloadButton() {
        await slcAct.Reload_Button.waitForExist(2000);
        await slcAct.Reload_Button.click();
    }
}
module.exports = SLCactions;
