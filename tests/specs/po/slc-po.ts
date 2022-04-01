class SLC {
  get Name_Field(): ReturnType<typeof $> {
    return $('input[name="name"]');
  }
  get Save_Button(): ReturnType<typeof $> {
    return $('button[type="submit"]');
  }
  get AddFunction_Button(): ReturnType<typeof $> {
    return $('a[href="/slc/configurate-function"]');
  }
  get Functions_Table(): ReturnType<typeof $> {
    return $('tbody');
  }
  get LastFunction(): ReturnType<typeof $$> {
    return $$('td[role="cell"]');
  }
  get Success_Message(): ReturnType<typeof $> {
    return $('.rrt-success .rrt-text');
  }
  get Error_Message(): ReturnType<typeof $> {
    return $('.rrt-error .rrt-text');
  }
  get Delete_Button(): ReturnType<typeof $> {
    return $('img[alt="Delete"]');
  }
  get DeleteConfirm_Popup(): ReturnType<typeof $> {
    return $('div[data-testid="del-popup"]');
  }
  get DeleteConfirm_Button(): ReturnType<typeof $$> {
    return $$('div[data-testid="del-popup"] button');
  }
  get Edit_Button(): ReturnType<typeof $> {
    return $('img[alt="Edit"]');
  }
  get Text_Box(): ReturnType<typeof $> {
    return $('div[role="textbox"]');
  }
  get Function_Buttons(): ReturnType<typeof $$> {
    return $$('div[data-testid="edit-func-btn"] button');
  }
  get Function_Arguments(): ReturnType<typeof $> {
    return $('div[data-testid="func-arg-wrap"] .cm-content');
  }
  get Function_Arguments_Buttons(): ReturnType<typeof $$> {
    return $$('div[data-testid="func-arg-wrap"] button');
  }
  get Function_Response(): ReturnType<typeof $> {
    return $('p');
  }
}

export { SLC };
