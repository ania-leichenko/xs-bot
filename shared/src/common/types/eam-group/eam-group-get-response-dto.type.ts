type EAMGroupGetResponseDto = {
  id: string;
  name: string;
  createdAt: string;
  permission: string;
  users: { id: string; name: string }[];
};

export { type EAMGroupGetResponseDto };
