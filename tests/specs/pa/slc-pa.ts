import { SLC } from '../po/slc-po';
import { slcData } from '../test-data/slc-data';

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
      timeout: 6000,
    });
    await slcAct.Delete_Button.click();
    await slcAct.DeleteConfirm_Popup.waitForDisplayed({
      timeout: 6000,
    });
    const [DeleteConfirm] = await slcAct.DeleteConfirm_Button;
    await DeleteConfirm.click();
  }
  async ClickEditButton(): Promise<void> {
    await slcAct.Edit_Button.waitForClickable({
      timeout: 7000,
    });
    await slcAct.Edit_Button.click();
  }
  async FillTextBox(): Promise<void> {
    await slcAct.Text_Box.waitForExist({
      timeout: 2000,
    });
    await slcAct.Text_Box.clearValue();
    await slcAct.Text_Box.setValue(slcData.FunctionCode);
  }
  async ClickSaveFunctionButton(): Promise<void> {
    const [, SaveFunction] = await slcAct.Function_Buttons;
    await SaveFunction.waitForClickable({
      timeout: 3000,
    });
    await SaveFunction.click();
  }
  async ClickRunFunctionButton(): Promise<void> {
    const [SaveFunction] = await slcAct.Function_Buttons;
    await SaveFunction.click();
  }
  async FillFunctionArguments(): Promise<void> {
    await slcAct.Function_Arguments.waitForDisplayed({
      timeout: 5000,
    });
    await slcAct.Function_Arguments.setValue(slcData.FunctionArguments);
    const [, SaveArguments] = await slcAct.Function_Arguments_Buttons;
    await SaveArguments.waitForClickable();
    await SaveArguments.moveTo();
    await SaveArguments.click();
  }
}

export { SLCActions };
