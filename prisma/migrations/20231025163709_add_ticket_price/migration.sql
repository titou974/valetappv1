-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "ticketPrice" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
