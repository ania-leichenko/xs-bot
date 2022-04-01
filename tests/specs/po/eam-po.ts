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
    return $$('input[type="checkbox"] + span');
  }
  get Workers(): ReturnType<typeof $$> {
    return $$('input[type="checkbox"] + span');
  }
  get SaveCSV_Button(): ReturnType<typeof $> {
    return $('div[data-testid="save-csv-btn"] button');
  }
  get DeleteWorker_Button(): ReturnType<typeof $> {
    return $('img[alt="Delete"]');
  }
  get DeleteConfirm_Popup(): ReturnType<typeof $> {
    return $('div[data-testid="del-popup"]');
  }
  get DeleteConfirm_Button(): ReturnType<typeof $$> {
    return $$('div[data-testid="del-popup"] button');
  }
  get LastWorker(): ReturnType<typeof $$> {
    return $$('td[role="cell"]');
  }
  get Permissions(): ReturnType<typeof $$> {
    return $$('form ul li:last-child input[type="checkbox"] + span');
  }
  get LastGroup(): ReturnType<typeof $$> {
    return $$('div[data-testid="eam-group-table"] td[role="cell"]');
  }
  get DeleteGroup_Button(): ReturnType<typeof $> {
    return $('div[data-testid="eam-group-table"] img[alt="Delete"]');
  }
  get EditGroup_Button(): ReturnType<typeof $> {
    return $('div[data-testid="eam-group-table"] img[alt="Edit"]');
  }
  get Success_Message(): ReturnType<typeof $> {
    return $('.rrt-success .rrt-text');
  }
  get Error_Message(): ReturnType<typeof $> {
    return $('.rrt-error .rrt-text');
  }
}

export { EAM };
