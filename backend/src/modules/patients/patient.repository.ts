import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { patients, type NewPatient, type Patient } from "../../db/schema";

export const patientRepository = {
  async findAll(): Promise<Patient[]> {
    return db.select().from(patients);
  },

  async findById(id: string): Promise<Patient | undefined> {
    const rows = await db.select().from(patients).where(eq(patients.id, id));
    return rows[0];
  },

  async findByUserId(userId: string): Promise<Patient | undefined> {
    const rows = await db
      .select()
      .from(patients)
      .where(eq(patients.userId, userId));
    return rows[0];
  },

  async create(data: NewPatient): Promise<Patient> {
    const rows = await db.insert(patients).values(data).returning();
    return rows[0];
  },

  async update(
    id: string,
    data: Partial<NewPatient>
  ): Promise<Patient | undefined> {
    const rows = await db
      .update(patients)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(patients.id, id))
      .returning();
    return rows[0];
  },

  async remove(id: string): Promise<boolean> {
    const rows = await db
      .delete(patients)
      .where(eq(patients.id, id))
      .returning();
    return rows.length > 0;
  },
};
