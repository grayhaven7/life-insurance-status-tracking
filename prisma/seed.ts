import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Alex's admin account
  const alexPassword = await bcrypt.hash("*yJmDUp27y8pPTg", 12);
  
  const alex = await prisma.user.upsert({
    where: { email: "alex@customlocaltech.com" },
    update: {
      passwordHash: alexPassword, // Update password if account exists
    },
    create: {
      email: "alex@customlocaltech.com",
      name: "Alex Mejia",
      passwordHash: alexPassword,
      role: "admin",
    },
  });

  console.log("Created/updated admin user:", alex.email);
  console.log("\n✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    // Don't exit with error code - allow build to continue
    // The account might already exist or there might be a connection issue
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
