-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "authToken" TEXT,
    "referall" TEXT NOT NULL,
    "referallFriend" TEXT,
    "mngpayId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keys" (
    "id" SERIAL NOT NULL,
    "wallet" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_referall_key" ON "User"("referall");
