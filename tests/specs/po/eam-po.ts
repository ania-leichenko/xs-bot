//import { TypeOfTag } from "typescript";

class EAM {
  get Name_Field(): ReturnType<typeof $> {
    return $('input[name="name"]');
  }
  get Save_Button(): ReturnType<typeof $> {
    return $('button[type="submit"]');
  }
  get AddWorker_Button(): ReturnType<typeof $> {
    return $('a[href="/eam/create-worker"]');
  }
  get AddGroup_Button(): ReturnType<typeof $> {
    return $('a[href="/eam/configurate-group"]');
  }
  get Groups(): ReturnType<typeof $$> {
    return $$('.checkbox_span__Kuugs');
  }
  get SaveCSV_Button(): ReturnType<typeof $> {
    return $('.styles_saveBtn__jQ6gL');
  }
  get DeleteWorker_Button(): ReturnType<typeof $> {
    return $('img[alt="Delete"]');
  }
  get DeleteConfirm_Popup(): ReturnType<typeof $> {
    return $('.styles_title__vuPhn');
  }
  get DeleteConfirm_Button(): ReturnType<typeof $$> {
    return $$('.styles_btn__9DPcn');
  }
  get LastWorker(): ReturnType<typeof $$> {
    return $$('.styles_tableCell__C6dnh');
  }
  get Permissions(): ReturnType<typeof $$> {
    return $$('.styles_inputGroups__bgqt2 li:last-child .checkbox_span__Kuugs');
  }
  get LastGroup(): ReturnType<typeof $$> {
    return $$('div[data-testid="eam-group-table"] .styles_tableCell__C6dnh');
  }
  get DeleteGroup_Button(): ReturnType<typeof $> {
    return $('div[data-testid="eam-group-table"] img[alt="Delete"]');
  }
  get EditGroup_Button(): ReturnType<typeof $> {
    return $('div[data-testid="eam-group-table"] img[alt="Edit"]');
  }
  get Success_Icon(): ReturnType<typeof $> {
    return $('.notification_check__FUZIb');
  }
  get Error_Icon(): ReturnType<typeof $> {
    return $('.notification_attention__obnLi');
  }
  get Message(): ReturnType<typeof $> {
    return $('.rrt-text');
  }
}

export { EAM };
