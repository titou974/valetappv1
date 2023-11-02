-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "ticketNumber" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT;
