/*
  Warnings:

  - The `age` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "firstName" DROP DEFAULT,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP DEFAULT,
DROP COLUMN "age",
ADD COLUMN     "age" INTEGER,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" DROP DEFAULT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "favorite" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "country" DROP DEFAULT,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "city" DROP DEFAULT,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "address" DROP DEFAULT;
