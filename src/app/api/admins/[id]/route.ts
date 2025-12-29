import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { hashPassword } from "@/lib/auth";
import prisma from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/admins/[id] - Update an admin
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: adminId } = await params;
    const body = await request.json();
    const { name, email, password, contactEmail, contactPhone } = body;

    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { id: adminId },
    });

    if (!existingAdmin || existingAdmin.role !== "admin") {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // If email is being changed, check if new email is already taken
    if (email && email !== existingAdmin.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email },
      });

      if (emailTaken) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (contactEmail !== undefined) updateData.contactEmail = contactEmail || null;
    if (contactPhone !== undefined) updateData.contactPhone = contactPhone || null;
    if (password) {
      updateData.passwordHash = await hashPassword(password);
    }

    const updatedAdmin = await prisma.user.update({
      where: { id: adminId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        contactEmail: true,
        contactPhone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedAdmin);
  } catch (error: any) {
    console.error("Error updating admin:", error);
    
    // Handle Prisma unique constraint errors (duplicate email)
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }
    
    // Handle Prisma record not found errors
    if (error?.code === "P2025") {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admins/[id] - Delete an admin
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: adminId } = await params;

    // Prevent deleting yourself
    if (adminId === session.user.id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { id: adminId },
      include: {
        assignedClients: true,
        statusChanges: true,
      },
    });

    if (!existingAdmin || existingAdmin.role !== "admin") {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // Check if admin has assigned clients
    if (existingAdmin.assignedClients.length > 0) {
      // Unassign clients instead of blocking deletion
      await prisma.client.updateMany({
        where: { assignedAdminId: adminId },
        data: { assignedAdminId: null },
      });
    }

    // Delete status history records created by this admin
    // This is necessary because StatusHistory has a foreign key to User
    if (existingAdmin.statusChanges.length > 0) {
      await prisma.statusHistory.deleteMany({
        where: { changedBy: adminId },
      });
    }

    // Delete the admin
    await prisma.user.delete({
      where: { id: adminId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting admin:", error);
    
    // Handle Prisma foreign key constraint errors
    if (error?.code === "P2003") {
      return NextResponse.json(
        { error: "Cannot delete admin: This admin has associated records that must be removed first" },
        { status: 400 }
      );
    }
    
    // Handle Prisma record not found errors
    if (error?.code === "P2025") {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

