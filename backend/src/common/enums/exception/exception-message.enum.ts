const ExceptionMessage = {
  INCORRECT_CREDENTIALS:
    'Your authentication information is incorrect. Please try again.',
  INCORRECT_EMAIL:
    'Account with that email does not exist. Try again or create a new account.',
  INVALID_TOKEN: 'Token is invalid.',
  PASSWORDS_NOT_MATCH: 'Passwords do not match.',
  USER_EXISTS: 'Account with this email already exists.',
  UNAUTHORIZED_USER: 'Unauthorized user.',
  WORKER_NAME:
    'Account with that name does not exist. Try again or create a new account.',
  WORKER_NAME_EXISTS: 'Worker with this name is exist',
  MASTER_NOT_FOUND: 'Master not Found',
  MASTER_SPACE_CREATE: 'Master is not able to create space.',
  MASTER_FUNCTION_CREATE: 'Master is not able to create function.',
  MASTER_SPACE_DELETE: 'Master is not able to delete space',
  MASTER_INSTANCE_CREATE: 'Master is not able to create instance',
  FUNCTION_NAME_EXISTS: 'Function with this name already exists.',
  FUNCTION_NOT_CREATED: 'Something went wrong and function don`t created.',
  GROUP_NOT_SELECTED: 'Please select any group or create a new one first',
} as const;

export { ExceptionMessage };
