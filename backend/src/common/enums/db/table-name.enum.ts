enum TableName {
  USERS = 'users',
  MASTERS = 'entity_access_management.masters',
  PERMISSIONS = 'entity_access_management.permissions',
  TENANTS = 'entity_access_management.tenants',
  WORKERS = 'entity_access_management.workers',
  GROUPS = 'entity_access_management.groups',
  USERS_GROUPS = 'entity_access_management.users_groups',
  GROUPS_PERMISSIONS = 'entity_access_management.groups_permissions',
  SPACES = 'binary_storage.spaces',
  OBJECTS = 'binary_storage.objects',
  FUNCTIONS = 'serverless_computing.functions',
  MIGRATIONS = 'migrations',
}

export { TableName };
