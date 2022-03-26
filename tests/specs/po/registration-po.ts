class RegistrationPage {
  get Sign_Button(): ReturnType<typeof $> {
    return $('button[type="submit"]');
  }

  get Email_Field(): ReturnType<typeof $> {
    return $('input[name="email"]');
  }

  get Password_Field(): ReturnType<typeof $> {
    return $('input[name="password"]');
  }

  get SignInAsWorker_Button(): ReturnType<typeof $> {
    return $('button[class="styles_button__azUJI"]');
  }

  get SignInAsMaster_Button(): ReturnType<typeof $> {
    return $('button[class="styles_button__JSGQl"]');
  }

  get TenantName_Field(): ReturnType<typeof $> {
    return $('input[name="tenantName"]');
  }

  get WorkerName_Field(): ReturnType<typeof $> {
    return $('input[name="workerName"]');
  }

  get SignUp_Link(): ReturnType<typeof $> {
    return $('a[href="/sign-up"]');
  }

  get SignIn_Link(): ReturnType<typeof $> {
    return $('a[href="/sign-in"]');
  }

  get Name_Field(): ReturnType<typeof $> {
    return $('input[name="name"]');
  }

  get Logo(): ReturnType<typeof $> {
    return $('img[class="styles_signUpLogo__iiydr"]');
  }
}

export { RegistrationPage };
