/*
  Warnings:

  - You are about to drop the column `expires` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expires",
DROP COLUMN "sessionToken",
ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "restaurantId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Account";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
