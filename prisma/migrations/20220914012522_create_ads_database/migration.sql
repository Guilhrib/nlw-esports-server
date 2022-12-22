-- CreateTable
CREATE TABLE "Ads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "yearsPlaying" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "weeksDays" TEXT NOT NULL,
    "hoursStart" INTEGER NOT NULL,
    "hoursEnd" INTEGER NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gamesId" TEXT NOT NULL,
    CONSTRAINT "Ads_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
