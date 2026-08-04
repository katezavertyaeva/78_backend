import { comparePassword, hashPassword } from "../../lib/hash";
import { signedToken } from "../../lib/jwt";
import { UserRepository } from "./user.entity";

export default class UserService {
  constructor(private readonly repo: UserRepository) {}

  async register(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email and password required");
    }

    const existing = await this.repo.findByEmail(email);

    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.repo.create(email, hashedPassword);

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = signedToken({ userId: user.id });

    return { user, token };
  }
}
