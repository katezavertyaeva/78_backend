export type UserResponseDto = {
  id: string;
  email: string;
  createdAt: string;
};

export type LoginResponseDto = {
  user: UserResponseDto;
  token: string;
};
