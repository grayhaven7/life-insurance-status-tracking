#!/bin/bash
# Run this script with your production DATABASE_URL
# Usage: DATABASE_URL="your-production-url" ./run-migration.sh

echo "Running Prisma migration..."
npx prisma migrate deploy

echo "Done! The admin_invitations table should now exist."

