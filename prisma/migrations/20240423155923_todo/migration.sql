-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(16) NOT NULL,
    "secondName" VARCHAR(16) NOT NULL,
    "thirdName" VARCHAR(16) NOT NULL,
    "login" VARCHAR(32) NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "headUserId" VARCHAR(64) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" UUID NOT NULL,
    "headline" VARCHAR(64) NOT NULL,
    "description" VARCHAR(64) NOT NULL,
    "endDate" DATE NOT NULL,
    "refreshDate" DATE NOT NULL,
    "priority" VARCHAR(16) NOT NULL,
    "status" VARCHAR(16) NOT NULL,
    "createrId" VARCHAR(64) NOT NULL,
    "responsibleId" VARCHAR(64) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");
