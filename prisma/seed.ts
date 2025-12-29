import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Neil's admin account
  const neilPassword = await bcrypt.hash("admin123", 12);
  
  const neil = await prisma.user.upsert({
    where: { email: "neil@financialplanninggroup.com" },
    update: {},
    create: {
      email: "neil@financialplanninggroup.com",
      name: "Neil Gronowetter",
      passwordHash: neilPassword,
      role: "admin",
    },
  });

  console.log("Created admin user:", neil.email);

  // Create Alex's admin account
  const alexPassword = await bcrypt.hash("*yJmDUp27y8pPTg", 12);
  
  const alex = await prisma.user.upsert({
    where: { email: "alex@customlocaltech.com" },
    update: {},
    create: {
      email: "alex@customlocaltech.com",
      name: "Alex Mejia",
      passwordHash: alexPassword,
      role: "admin",
    },
  });

  console.log("Created admin user:", alex.email);

  console.log("\n✅ Seed completed successfully!");
  console.log("\n📋 DEFAULT ADMIN CREDENTIALS:");
  console.log("   Email: neil@financialplanninggroup.com");
  console.log("   Password: admin123");
  console.log("   Email: alex@customlocaltech.com");
  console.log("   Password: *yJmDUp27y8pPTg");
  console.log("\n⚠️  Please change the default password after first login!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
