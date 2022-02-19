type EAMGroupCreateRequestDto = {
  name: string;
  tenantId: string;
  workersIds: string[];
  permissionIds: string[];
};

export { type EAMGroupCreateRequestDto };
