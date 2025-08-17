import app from "./app";
import { connectDB } from "./config/database";
import { seedAdminUser } from "./utils/seedAdmin";

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  console.log("✅ Database connected");
  await seedAdminUser();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
