import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Cache Prisma client in globalThis to prevent connection pool exhaustion in serverless
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
} else {
  // In production (serverless), also cache to reuse connections within the same container
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prisma;
  }
}

export default prisma;
