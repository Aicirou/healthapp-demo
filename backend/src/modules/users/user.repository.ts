import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { users, type NewUser, type User } from "../../db/schema";

export const userRepository = {
  async findByEmail(email: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.email, email));
    return rows[0];
  },

  async findById(id: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.id, id));
    return rows[0];
  },

  async create(data: NewUser): Promise<User> {
    const rows = await db.insert(users).values(data).returning();
    return rows[0];
  },

  async findAll(): Promise<User[]> {
    return db.select().from(users);
  },
};
