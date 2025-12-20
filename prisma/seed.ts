import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user with simple test credentials
  const adminPassword = await bcrypt.hash("test123", 12);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      name: "Test Admin",
      passwordHash: adminPassword,
      role: "admin",
    },
  });

  console.log("Created admin user:", admin.email);

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

  // Create a test client with simple credentials
  const clientPassword = await bcrypt.hash("test123", 12);
  
  const testClient = await prisma.client.upsert({
    where: { email: "client@test.com" },
    update: {
      currentStage: 1, // Reset to step 1 for testing the full application process
    },
    create: {
      email: "client@test.com",
      name: "Test Client",
      phone: "(555) 123-4567",
      passwordHash: clientPassword,
      currentStage: 1,
    },
  });

  console.log("Created test client:", testClient.email);

  // Add some status history for the test client
  const existingHistory = await prisma.statusHistory.findFirst({
    where: { clientId: testClient.id },
  });

  if (!existingHistory) {
    await prisma.statusHistory.createMany({
      data: [
        {
          clientId: testClient.id,
          stage: 1,
          changedBy: admin.id,
          note: "Application submitted",
          createdAt: new Date(),
        },
      ],
      skipDuplicates: true,
    });
    console.log("Added status history for test client");
  }

  console.log("\n✅ Seed completed successfully!");
  console.log("\n📋 TEST LOGIN CREDENTIALS:");
  console.log("┌──────────────────────────────────────────┐");
  console.log("│  ADMIN:  admin@test.com / test123       │");
  console.log("│  CLIENT: client@test.com / test123      │");
  console.log("└──────────────────────────────────────────┘");
  console.log("\n📋 PRODUCTION CREDENTIALS:");
  console.log("   Admin: neil@financialplanninggroup.com / admin123");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
