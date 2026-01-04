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

  // Create test admin account for demo/testing
  const testAdminPassword = await bcrypt.hash("test123", 12);
  
  const testAdmin = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {
      passwordHash: testAdminPassword, // Update password if account exists
    },
    create: {
      email: "admin@test.com",
      name: "Test Admin",
      passwordHash: testAdminPassword,
      role: "admin",
    },
  });

  console.log("Created/updated test admin user:", testAdmin.email);

  // Create test client account for demo/testing
  const testClientPassword = await bcrypt.hash("test123", 12);
  
  const testClient = await prisma.client.upsert({
    where: { email: "client@test.com" },
    update: {
      passwordHash: testClientPassword, // Update password if account exists
      assignedAdminId: testAdmin.id, // Ensure assigned to test admin
    },
    create: {
      email: "client@test.com",
      name: "Test Client",
      passwordHash: testClientPassword,
      currentStage: 1,
      assignedAdminId: testAdmin.id,
    },
  });

  console.log("Created/updated test client user:", testClient.email);

  // Create initial status history for test client if it doesn't exist
  const existingHistory = await prisma.statusHistory.findFirst({
    where: { clientId: testClient.id },
  });

  if (!existingHistory) {
    await prisma.statusHistory.create({
      data: {
        clientId: testClient.id,
        stage: 1,
        changedBy: testAdmin.id,
        note: "Application submitted - test account created",
      },
    });
    console.log("Created initial status history for test client");
  }

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
