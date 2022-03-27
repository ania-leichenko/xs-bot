type EamGroupGetByIdResponseDto = {
  id: string;
  name: string;
  createdAt: string;
  tenantId: string;
  workersIds: string[];
  permissionsIds: string[];
};

export { type EamGroupGetByIdResponseDto };
