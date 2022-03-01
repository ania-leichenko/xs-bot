const EAMTenantValidationRule = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 10,
  NAME_PATTERN: /^[a-zA-Z]+$/,
} as const;

export { EAMTenantValidationRule };
