type EAMGroupResponseDto = {
  id: string;
  name: string;
  createdAt: Date;
  tenantId: string;
  users: string[];
  permissions: string[];
};

export { type EAMGroupResponseDto };
