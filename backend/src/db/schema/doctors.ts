import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const doctors = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  specialization: varchar("specialization", { length: 100 }).notNull(),
  licenseNumber: varchar("license_number", { length: 50 }).notNull().unique(),
  department: varchar("department", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  bio: text("bio"),
  isAvailable: boolean("is_available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Doctor = typeof doctors.$inferSelect;
export type NewDoctor = typeof doctors.$inferInsert;
