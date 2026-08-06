export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(email: string, password: string): Promise<User>;
}
