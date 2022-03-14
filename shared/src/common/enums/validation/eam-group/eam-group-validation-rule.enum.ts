const EAMGroupValidationRule = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 20,
  NAME_REGEX: /^[a-zA-Z0-9\-.]+$/,
  NAME_REGEX_FIRST_AND_LAST_CHARTER: /^[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+$/,
  PERMISSION_SELECTED_MIN: 1,
} as const;

export { EAMGroupValidationRule };
