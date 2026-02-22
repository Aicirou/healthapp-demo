import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { doctors, type NewDoctor, type Doctor } from "../../db/schema";

export const doctorRepository = {
  async findAll(): Promise<Doctor[]> {
    return db.select().from(doctors);
  },

  async findById(id: string): Promise<Doctor | undefined> {
    const rows = await db.select().from(doctors).where(eq(doctors.id, id));
    return rows[0];
  },

  async findByUserId(userId: string): Promise<Doctor | undefined> {
    const rows = await db
      .select()
      .from(doctors)
      .where(eq(doctors.userId, userId));
    return rows[0];
  },

  async create(data: NewDoctor): Promise<Doctor> {
    const rows = await db.insert(doctors).values(data).returning();
    return rows[0];
  },

  async update(
    id: string,
    data: Partial<NewDoctor>
  ): Promise<Doctor | undefined> {
    const rows = await db
      .update(doctors)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(doctors.id, id))
      .returning();
    return rows[0];
  },

  async remove(id: string): Promise<boolean> {
    const rows = await db
      .delete(doctors)
      .where(eq(doctors.id, id))
      .returning();
    return rows.length > 0;
  },
};
