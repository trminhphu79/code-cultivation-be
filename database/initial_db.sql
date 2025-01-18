-- Create UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for credential type
CREATE TYPE "credentialType" AS ENUM ('NONE', 'GITHUB', 'GOOGLE');

-- Create enum for role
CREATE TYPE "role" AS ENUM ('ADMIN', 'USER', 'GUILD_OWNER', 'GUILD_MEMBER');

-- Create Realms table
CREATE TABLE "realm" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) UNIQUE,
    "description" TEXT,
    "level" INTEGER,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Sects table
CREATE TABLE "sects" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "logo" VARCHAR(255) NOT NULL,
    "description" TEXT
);

-- Create Account table
CREATE TABLE "account" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "isVerify" BOOLEAN DEFAULT FALSE,
    "credentialType" "credentialType" DEFAULT 'NONE',
    "role" "role" DEFAULT 'USER',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Profile table
CREATE TABLE "profile" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "accountId" UUID NOT NULL REFERENCES "account"("id"),
    "realmId" UUID REFERENCES "realm"("id"),
    "fullName" VARCHAR(255) NOT NULL,
    "nickName" VARCHAR(255) UNIQUE NOT NULL,
    "bio" TEXT,
    "avatarUrl" VARCHAR(255),
    "totalExp" VARCHAR(255) DEFAULT '0',
    "streak" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT TRUE,
    "githubLink" VARCHAR(255) DEFAULT '',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Achievements table
CREATE TABLE "achievements" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "logo" VARCHAR(255) NOT NULL
);

-- Create Material Arts table
CREATE TABLE "materialArts" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "sectId" UUID NOT NULL REFERENCES "sects"("id"),
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "logo" VARCHAR(255) NOT NULL,
    "description" TEXT
);

-- Create Profile Achievements junction table
CREATE TABLE "profileAchievements" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL REFERENCES "profile"("id"),
    "achievementId" UUID NOT NULL REFERENCES "achievements"("id"),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Profile Material Arts junction table
CREATE TABLE "profileMaterialArts" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL REFERENCES "profile"("id"),
    "materialArtId" UUID NOT NULL REFERENCES "materialArts"("id"),
    "masteryLevel" VARCHAR(255) DEFAULT '0' NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better query performance
CREATE INDEX "idx_profile_accountId" ON "profile"("accountId");
CREATE INDEX "idx_profile_realmId" ON "profile"("realmId");
CREATE INDEX "idx_materialArts_sectId" ON "materialArts"("sectId");
CREATE INDEX "idx_profileAchievements_profileId" ON "profileAchievements"("profileId");
CREATE INDEX "idx_profileAchievements_achievementId" ON "profileAchievements"("achievementId");
CREATE INDEX "idx_profileMaterialArts_profileId" ON "profileMaterialArts"("profileId");
CREATE INDEX "idx_profileMaterialArts_materialArtId" ON "profileMaterialArts"("materialArtId");