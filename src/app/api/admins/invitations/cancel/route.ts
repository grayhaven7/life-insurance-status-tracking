import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

// DELETE /api/admins/invitations/cancel - Cancel/delete an invitation
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id: invitationId } = body;

    if (!invitationId) {
      return NextResponse.json(
        { error: "Invitation ID is required" },
        { status: 400 }
      );
    }

    // Check if invitation exists
    const invitation = await prisma.adminInvitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    // Check if invitation has already been used
    if (invitation.usedAt) {
      return NextResponse.json(
        { error: "Cannot cancel an invitation that has already been used" },
        { status: 400 }
      );
    }

    // Delete the invitation
    await prisma.adminInvitation.delete({
      where: { id: invitationId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting invitation:", error);
    
    // Handle Prisma record not found errors
    if (error?.code === "P2025") {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}



