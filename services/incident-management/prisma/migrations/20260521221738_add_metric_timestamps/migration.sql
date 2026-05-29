-- AlterTable
ALTER TABLE "incidents" ADD COLUMN     "acknowledgedAt" TIMESTAMP(3),
ADD COLUMN     "resolvedAt" TIMESTAMP(3);
