-- CreateTable
CREATE TABLE "email_opens" (
    "id" TEXT NOT NULL,
    "tracking_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "email_type" TEXT NOT NULL,
    "subject" TEXT,
    "first_opened_at" TIMESTAMP(3),
    "last_opened_at" TIMESTAMP(3),
    "open_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_opens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_opens_tracking_id_key" ON "email_opens"("tracking_id");

-- CreateIndex
CREATE INDEX "email_opens_client_id_idx" ON "email_opens"("client_id");

-- CreateIndex
CREATE INDEX "email_opens_tracking_id_idx" ON "email_opens"("tracking_id");

-- AddForeignKey
ALTER TABLE "email_opens" ADD CONSTRAINT "email_opens_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;



