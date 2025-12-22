import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

// GET /api/admins - Fetch all admins for dropdown selection
export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        contactEmail: true,
        contactPhone: true,
      },
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


