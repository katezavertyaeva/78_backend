import { User } from "./user.entity";
import { UserResponseDto } from "./user.response.dto";

export default function toUserResponse(user: User): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };
}
