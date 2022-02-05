const MasterSignUpValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  NAME_REQUIRE: 'Name is required',
  NAME_MIN_LENGTH: 'Name must have at least 4 characters',
  NAME_FIRST_CHARTER: 'Name must start with a letter',
  PASSWORD_REQUIRE: 'Name is required',
  PASSWORD_MIN_LENGTH: 'Password must have at least 4 characters',
} as const;

export { MasterSignUpValidationMessage };
