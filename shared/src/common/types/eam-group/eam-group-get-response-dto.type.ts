type EAMGroupGetResponseDto = {
  id: string;
  name: string;
  createdAt: string;
  users: { id: string; name: string }[] | [];
  permissions: { id: string; name: string }[];
};

export { type EAMGroupGetResponseDto };
