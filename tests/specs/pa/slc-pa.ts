import { SLC } from '../po/slc-po';

const slcAct = new SLC();

class SLCActions {
  async ClickSaveButton(): Promise<void> {
    await slcAct.Save_Button.waitForExist({
      timeout: 5000,
    });
    await slcAct.Save_Button.moveTo();
    await slcAct.Save_Button.click();
  }

  async AddFunctionButton(): Promise<void> {
    await slcAct.AddFunction_Button.waitForClickable({
      timeout: 2000,
    });
    await slcAct.AddFunction_Button.click();
  }

  async FillCreateFunctionForm(Name: string): Promise<void> {
    await slcAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    await slcAct.Name_Field.setValue(Name);
  }

  async ClickDeleteButton(): Promise<void> {
    await slcAct.Delete_Button.waitForExist({
      timeout: 4000,
    });
    await slcAct.Delete_Button.click();
  }

  async ClickReloadButton(): Promise<void> {
    await slcAct.Reload_Button.waitForExist({
      timeout: 2000,
    });
    await slcAct.Reload_Button.click();
  }
}

export { SLCActions };
