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

  get Logo(): ReturnType<typeof $> {
    return $('img[alt="logo"]');
  }

  get Groups(): ReturnType<typeof $$> {
    return $$('.checkbox_span__Kuugs');
  }

  get SaveCSV_Button(): ReturnType<typeof $> {
    return $('.styles_saveBtn__jQ6gL');
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

  get ReloadGroup_Button(): ReturnType<typeof $> {
    return $('div[data-testid="eam-group-table"] img[alt="Reload"]');
  }

  get DeleteGroup_Button(): ReturnType<typeof $> {
    return $('div[data-testid="eam-group-table"] img[alt="Delete"]');
  }
}

export { EAM };
