const ExceptionMessage = {
  INCORRECT_CREDENTIALS:
    'Your authentication information is incorrect. Please try again.',
  INCORRECT_EMAIL:
    'Account with that email does not exist. Try again or create a new account.',
  INCORRECT_TENANT_NAME: 'Account with that tenant name does not exist.',
  TENANT_EXISTS: 'Tenant does not is exists',
  TENANT_NAME_EXISTS: 'Tenant with this name already exists',
  INCORRECT_WORKER_NAME:
    'Account with that worker name does not exist. Try again or create a new account.',
  INVALID_TOKEN: 'Token is invalid.',
  PASSWORDS_NOT_MATCH: 'Passwords do not match.',
  USER_EXISTS: 'Account with this email already exists.',
  UNAUTHORIZED_USER: 'Unauthorized user.',
  WORKER_NAME_EXISTS: 'Worker with this name is exist',
  WORKER_DELETE_WORKER: 'Worker is not able to delete another worker',
  WORKER_NOT_FOUND: 'Worker not Found',
  MASTER_NOT_FOUND: 'Master not Found',
  MASTER_FUNCTION_CREATE: 'Master is not able to create function.',
  MASTER_FUNCTION_DELETE: 'Master is not able to delete function.',
  MASTER_FUNCTION_UPDATE: 'Master is not able to edit function.',
  MASTER_SPACE_CREATE: 'Master is not able to create space.',
  MASTER_SPACE_DELETE: 'Master is not able to delete space',
  MASTER_OBJECT_UPLOAD: 'Master is not able to upload object',
  MASTER_OBJECT_DOWNLOAD: 'Master is not able to download object',
  SPACE_NOT_FOUND: 'Space not found.',
  OBJECT_NOT_FOUND: 'Object not found, reload page and try again',
  MASTER_INSTANCE_CREATE: 'Master is not able to create instance',
  MASTER_DELETE: 'Master can not be deleted',
  FUNCTION_NAME_EXISTS: 'Function with this name already exists.',
  FUNCTION_NOT_CREATED: 'Something went wrong and function don`t created.',
  FUNCTION_NOT_FOUND: 'Function not found.',
  FUNCTION_NOT_CHANGE: 'Function code no changes.',
  FUNCTION_NOT_UPDATED: 'Function code not updated.',
  GROUP_NOT_SELECTED: 'Please select any group or create a new one first',
  GROUP_NOT_EMPTY: 'The group with workers can not be deleted',
  GROUP_DOES_NOT_EXIST: 'An error happened, reload page and try again',
  GROUP_EXISTS: 'Group with this name already exists',
  INSTANCE_NOT_FOUND: 'Instance not found',
  SSH_KEY_NOT_FOUND: 'Ssh key not found',
  NOTHING_TO_UPDATE: 'Nothing to update',
  SPACE_EXISTS: 'Space with this name already exists',
  OBJECT_NOT_UPLOADED: 'Object is not uploaded',
  OBJECT_ACCESS_DENIED: 'You do not have access to this object',
} as const;

export { ExceptionMessage };
