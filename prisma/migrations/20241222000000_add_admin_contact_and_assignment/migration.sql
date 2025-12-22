-- Add contact fields to users (admins) table
ALTER TABLE "users" ADD COLUMN "contact_email" TEXT;
ALTER TABLE "users" ADD COLUMN "contact_phone" TEXT;

-- Add assigned_admin_id to clients table
ALTER TABLE "clients" ADD COLUMN "assigned_admin_id" TEXT;

-- Add foreign key constraint for assigned admin
ALTER TABLE "clients" ADD CONSTRAINT "clients_assigned_admin_id_fkey" 
  FOREIGN KEY ("assigned_admin_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create index for faster lookups
CREATE INDEX "clients_assigned_admin_id_idx" ON "clients"("assigned_admin_id");



