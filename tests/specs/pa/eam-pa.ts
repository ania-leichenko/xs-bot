import { EAM } from '../po/eam-po';

const eamAct = new EAM();

class EAMActions {
  async ChangeTenantName(Name: string): Promise<void> {
    await eamAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    await eamAct.Name_Field.clearValue();
    await eamAct.Name_Field.setValue(Name);
  }

  async ClickSaveButton(): Promise<void> {
    await eamAct.Save_Button.waitForClickable({
      timeout: 10000,
    });
    await eamAct.Save_Button.moveTo();
    await eamAct.Save_Button.click();
  }

  async AddWorkerButton(): Promise<void> {
    await eamAct.AddWorker_Button.waitForClickable({
      timeout: 2000,
    });
    await eamAct.AddWorker_Button.click();
  }

  async AddGroupButton(): Promise<void> {
    await eamAct.AddGroup_Button.waitForClickable({
      timeout: 2000,
    });
    await eamAct.AddGroup_Button.click();
  }

  async FillCreateWorkerForm(Name: string): Promise<void> {
    await eamAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    await eamAct.Name_Field.setValue(Name);
    const [eamGroup] = await eamAct.Groups;
    await eamGroup.scrollIntoView();
    await eamGroup.moveTo();
    await eamGroup.click();
  }

  async ClickSaveCSV(): Promise<void> {
    await eamAct.SaveCSV_Button.waitForExist({
      timeout: 5000,
    });
    await eamAct.SaveCSV_Button.scrollIntoView();
    await eamAct.SaveCSV_Button.moveTo();
    await eamAct.SaveCSV_Button.click();
  }

  async FillCreateGroupForm(Name: string): Promise<void> {
    await eamAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    await eamAct.Name_Field.setValue(Name);
    const [eamPermission] = await eamAct.Permissions;
    await eamPermission.scrollIntoView();
    await eamPermission.click();
  }

  async ClickReloadGroupButton(): Promise<void> {
    await eamAct.ReloadGroup_Button.waitForExist({
      timeout: 8000,
    });
    await eamAct.ReloadGroup_Button.click();
  }

  async ClickDeleteGroupButton(): Promise<void> {
    await eamAct.DeleteGroup_Button.waitForExist({
      timeout: 2000,
    });
    await eamAct.DeleteGroup_Button.click();
  }
}

export { EAMActions };
