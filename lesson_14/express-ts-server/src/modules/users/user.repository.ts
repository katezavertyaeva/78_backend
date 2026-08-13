import { eq } from "drizzle-orm";
import { db } from "../../db";
import { User, UserRepository } from "./user.entity";
import { users } from "../../db/schema";

export class DrizzleUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user ?? null;
  }

  async create(email: string, password: string): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({ email, password })
      .returning();

    return user;
  }
}
