// src/utils/seedAdmin.ts
import { User } from "../models/user.model";

export const seedAdminUser = async () => {
  const adminEmail = "admin@example.com";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) return;

  const admin = new User({
    name: "Admin",
    email: adminEmail,
    password: "admin@123", // You can hash it later
    role: "admin",
  });

  await admin.save();
  console.log("✅ Admin user seeded:", adminEmail);
};
