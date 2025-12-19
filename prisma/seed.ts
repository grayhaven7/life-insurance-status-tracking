import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create default admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  
  const admin = await prisma.user.upsert({
    where: { email: "neil@financialplanninggroup.com" },
    update: {},
    create: {
      email: "neil@financialplanninggroup.com",
      name: "Neil Gronowetter",
      passwordHash: adminPassword,
      role: "admin",
    },
  });

  console.log("Created admin user:", admin.email);

  // Create a demo client for testing
  const clientPassword = await bcrypt.hash("demo123", 12);
  
  const demoClient = await prisma.client.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo Client",
      phone: "(555) 123-4567",
      passwordHash: clientPassword,
      currentStage: 5,
    },
  });

  console.log("Created demo client:", demoClient.email);

  // Add some status history for the demo client
  await prisma.statusHistory.createMany({
    data: [
      {
        clientId: demoClient.id,
        stage: 1,
        changedBy: admin.id,
        note: "Application submitted",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      },
      {
        clientId: demoClient.id,
        stage: 2,
        changedBy: admin.id,
        note: "Part 2 sent via email",
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
      },
      {
        clientId: demoClient.id,
        stage: 3,
        changedBy: admin.id,
        note: "Part 2 completed and received",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      },
      {
        clientId: demoClient.id,
        stage: 4,
        changedBy: admin.id,
        note: "Medical exam scheduled for next week",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
      {
        clientId: demoClient.id,
        stage: 5,
        changedBy: admin.id,
        note: "Medical exam completed successfully",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
    ],
    skipDuplicates: true,
  });

  console.log("Added status history for demo client");

  console.log("\n✅ Seed completed successfully!");
  console.log("\n📋 Login credentials:");
  console.log("   Admin: neil@financialplanninggroup.com / admin123");
  console.log("   Demo Client: demo@example.com / demo123");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
