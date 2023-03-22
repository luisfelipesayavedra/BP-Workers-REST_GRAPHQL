/*
  Warnings:

  - You are about to alter the column `percentage` on the `Bulkings` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bulkings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "percentage" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Bulkings" ("createdAt", "id", "percentage", "updatedAt") SELECT "createdAt", "id", "percentage", "updatedAt" FROM "Bulkings";
DROP TABLE "Bulkings";
ALTER TABLE "new_Bulkings" RENAME TO "Bulkings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
