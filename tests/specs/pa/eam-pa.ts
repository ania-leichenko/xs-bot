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

  async FillCreateWorkerWithoutGroupForm(Name: string): Promise<void> {
    await eamAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    await eamAct.Name_Field.setValue(Name);
  }

  async ClickSaveCSV(): Promise<void> {
    await eamAct.SaveCSV_Button.waitForExist({
      timeout: 5000,
    });
    await eamAct.SaveCSV_Button.scrollIntoView();
    await eamAct.SaveCSV_Button.moveTo();
    await eamAct.SaveCSV_Button.click();
  }

  async ClickDeleteWorkerButton(): Promise<void> {
    await eamAct.DeleteWorker_Button.waitForClickable({
      timeout: 5000,
    });
    await eamAct.DeleteWorker_Button.click();
    await eamAct.DeleteConfirm_Popup.waitForDisplayed({
      timeout: 3000,
    });
    const [, , , DeleteConfirm] = await eamAct.DeleteConfirm_Button;
    await DeleteConfirm.click();
  }

  async FillCreateGroupForm(Name: string): Promise<void> {
    await eamAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    await eamAct.Name_Field.setValue(Name);
    const [bsPermission] = await eamAct.Permissions;
    await bsPermission.scrollIntoView();
    await bsPermission.click();
  }

  async FillCreateGroupWithoutPermissionsForm(Name: string): Promise<void> {
    await eamAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    await eamAct.Name_Field.clearValue();
    await eamAct.Name_Field.setValue(Name);
  }
  async FillCreateGroupWithWorkersForm(Name: string): Promise<void> {
    await eamAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    await eamAct.Name_Field.setValue(Name);
    const [eamWorker] = await eamAct.LastWorker;
    await eamWorker.scrollIntoView();
    await eamWorker.click();
    const [bsPermission] = await eamAct.Permissions;
    await bsPermission.scrollIntoView();
    await bsPermission.click();
  }
  async FillEditWorkersInTheGroupForm(): Promise<void> {
    await eamAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    const [eamWorker] = await eamAct.LastWorker;
    await eamWorker.scrollIntoView();
    await eamWorker.click();
  }
  async FillEditGroupPermissionsForm(): Promise<void> {
    await eamAct.Name_Field.waitForClickable({
      timeout: 2000,
    });
    const [, eamPermission] = await eamAct.Permissions;
    await eamPermission.scrollIntoView();
    await eamPermission.click();
  }

  async ClickDeleteGroupButton(): Promise<void> {
    await eamAct.DeleteGroup_Button.waitForClickable({
      timeout: 8000,
    });
    await eamAct.DeleteGroup_Button.click();
    await eamAct.DeleteConfirm_Popup.waitForDisplayed({
      timeout: 3000,
    });
    const [, , , DeleteConfirm] = await eamAct.DeleteConfirm_Button;
    await DeleteConfirm.click();
  }
  async ClickEditGroupButton(): Promise<void> {
    await eamAct.EditGroup_Button.waitForClickable({
      timeout: 4000,
    });
    await eamAct.EditGroup_Button.click();
  }
}

export { EAMActions };
