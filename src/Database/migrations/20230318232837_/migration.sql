-- CreateTable
CREATE TABLE "BulkingsError" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "error" TEXT NOT NULL,
    "BuilkingsId" INTEGER NOT NULL,
    CONSTRAINT "BulkingsError_BuilkingsId_fkey" FOREIGN KEY ("BuilkingsId") REFERENCES "Bulkings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
