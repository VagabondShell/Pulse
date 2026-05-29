-- CreateTable
CREATE TABLE "raw_alerts" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "labels" JSONB,
    "status" TEXT NOT NULL DEFAULT 'received',
    "incidentId" TEXT,
    "eventTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "raw_alerts_pkey" PRIMARY KEY ("id")
);
