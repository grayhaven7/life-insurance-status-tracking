import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { hashPassword } from "@/lib/auth";
import prisma from "@/lib/db";

// PUT /api/admins/[id] - Update an admin
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminId = params.id;
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
  } catch (error) {
    console.error("Error updating admin:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admins/[id] - Delete an admin
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminId = params.id;

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

    // Delete the admin
    await prisma.user.delete({
      where: { id: adminId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

