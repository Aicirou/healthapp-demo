import {
  pgTable,
  uuid,
  varchar,
  date,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const patients = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: varchar("gender", { length: 20 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: text("address"),
  medicalRecordNumber: varchar("medical_record_number", { length: 50 })
    .notNull()
    .unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Patient = typeof patients.$inferSelect;
export type NewPatient = typeof patients.$inferInsert;
