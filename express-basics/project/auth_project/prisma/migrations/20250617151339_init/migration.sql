-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "enmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_enmail_key" ON "User"("enmail");
