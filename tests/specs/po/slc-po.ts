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

  get Logo(): ReturnType<typeof $> {
    return $('img[alt="logo"]');
  }

  get LastFunction(): ReturnType<typeof $$> {
    return $$('.styles_tableCell__C6dnh');
  }

  get ErrorMessage(): ReturnType<typeof $> {
    return $('#dialogDesk-9226');
  }

  get Delete_Button(): ReturnType<typeof $> {
    return $('img[alt="Delete"]');
  }

  get Edit_Button(): ReturnType<typeof $> {
    return $('img[alt="Edit"]');
  }

  get Reload_Button(): ReturnType<typeof $> {
    return $('img[alt="Reload"]');
  }
}

export { SLC };
