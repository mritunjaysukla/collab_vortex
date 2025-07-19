import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1752839742506 implements MigrationInterface {
    name = 'InitialMigration1752839742506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brand_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying NOT NULL, "industry" character varying, "logoUrl" character varying, "verified" boolean NOT NULL DEFAULT false, "teamSize" character varying, "description" text, "website" character varying, "location" character varying, "targetAudience" text array NOT NULL DEFAULT '{}', "monthlyBudget" numeric(15,2), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_f1485d18dd67c61ac6db30d8a7" UNIQUE ("userId"), CONSTRAINT "PK_215e0a9fad7cbd920d63caea7c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contracts_status_enum" AS ENUM('draft', 'pending_signature', 'signed', 'active', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "terms" text NOT NULL, "milestones" jsonb, "signedAt" TIMESTAMP, "status" "public"."contracts_status_enum" NOT NULL DEFAULT 'draft', "approved" boolean NOT NULL DEFAULT false, "creatorSignature" character varying, "brandSignature" character varying, "additionalTerms" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "collaborationId" uuid, CONSTRAINT "REL_d7b20e0858a4fe69b565714bf3" UNIQUE ("collaborationId"), CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."deliverables_status_enum" AS ENUM('pending', 'submitted', 'approved', 'revision_requested', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "deliverables" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "contentUrl" character varying, "status" "public"."deliverables_status_enum" NOT NULL DEFAULT 'pending', "feedback" text, "revisionCount" integer NOT NULL DEFAULT '0', "dueDate" date, "submittedAt" TIMESTAMP, "approvedAt" TIMESTAMP, "attachments" text array NOT NULL DEFAULT '{}', "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "collaborationId" uuid, CONSTRAINT "PK_13367f7b271fb2b95ccb18d78a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reviews_visibility_enum" AS ENUM('public', 'private', 'platform_only')`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" numeric(2,1) NOT NULL, "feedback" text, "visibility" "public"."reviews_visibility_enum" NOT NULL DEFAULT 'public', "tags" text array NOT NULL DEFAULT '{}', "isVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "collaborationId" uuid, "reviewerId" uuid, "revieweeId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."collaborations_status_enum" AS ENUM('pending', 'active', 'paused', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "collaborations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" date NOT NULL, "endDate" date NOT NULL, "status" "public"."collaborations_status_enum" NOT NULL DEFAULT 'pending', "isCompleted" boolean NOT NULL DEFAULT false, "notes" text, "progress" numeric(3,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "campaignId" uuid, "proposalId" uuid, CONSTRAINT "REL_442c195208bc2f3f2ff2fe90d6" UNIQUE ("proposalId"), CONSTRAINT "PK_6d843532637cb55b078793e6811" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."campaigns_platforms_enum" AS ENUM('instagram', 'youtube', 'tiktok', 'twitter', 'linkedin', 'facebook')`);
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "budget" numeric(15,2) NOT NULL, "targetAudience" text array NOT NULL DEFAULT '{}', "startDate" date NOT NULL, "endDate" date NOT NULL, "platforms" "public"."campaigns_platforms_enum" array NOT NULL DEFAULT '{}', "deliverables" text array NOT NULL DEFAULT '{}', "requirements" jsonb, "isActive" boolean NOT NULL DEFAULT true, "isFeatured" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "brandProfileId" uuid, CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."proposals_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "proposals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "customMessage" text, "rate" numeric(10,2) NOT NULL, "status" "public"."proposals_status_enum" NOT NULL DEFAULT 'pending', "portfolioLink" character varying, "deliverableProposals" text array NOT NULL DEFAULT '{}', "proposedStartDate" date, "proposedEndDate" date, "rejectionReason" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorProfileId" uuid, "campaignId" uuid, CONSTRAINT "PK_db524c8db8e126a38a2f16d8cac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."platform_integrations_platform_enum" AS ENUM('instagram', 'youtube', 'tiktok', 'twitter', 'linkedin', 'facebook')`);
        await queryRunner.query(`CREATE TABLE "platform_integrations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "platform" "public"."platform_integrations_platform_enum" NOT NULL, "authToken" character varying, "refreshToken" character varying, "tokenExpiresAt" TIMESTAMP, "syncStatus" character varying NOT NULL DEFAULT 'disconnected', "lastSyncAt" TIMESTAMP, "platformUserId" character varying, "platformUsername" character varying, "platformData" jsonb, "errorMessage" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorProfileId" uuid, CONSTRAINT "PK_d525f5238568b296a2a9a36ce79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."creator_analytics_platform_enum" AS ENUM('instagram', 'youtube', 'tiktok', 'twitter', 'linkedin', 'facebook')`);
        await queryRunner.query(`CREATE TABLE "creator_analytics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "platform" "public"."creator_analytics_platform_enum" NOT NULL, "date" date NOT NULL, "followers" integer NOT NULL DEFAULT '0', "engagementRate" numeric(5,2) NOT NULL DEFAULT '0', "reach" integer NOT NULL DEFAULT '0', "views" integer NOT NULL DEFAULT '0', "likes" integer NOT NULL DEFAULT '0', "comments" integer NOT NULL DEFAULT '0', "shares" integer NOT NULL DEFAULT '0', "saves" integer NOT NULL DEFAULT '0', "demographicData" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorProfileId" uuid, CONSTRAINT "PK_65a00a6f6026c4174d08f15a3d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "creator_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bio" character varying, "profileImage" character varying, "platformStats" jsonb, "isVerified" boolean NOT NULL DEFAULT false, "niches" text array NOT NULL DEFAULT '{}', "location" character varying, "website" character varying, "mediaKit" character varying, "baseRate" numeric(10,2), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_666d6a0fef932ec2c5fea7dff8" UNIQUE ("userId"), CONSTRAINT "PK_5f58900809b867a2683b6e0e94a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('creator', 'brand')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('pending', 'processing', 'completed', 'failed', 'refunded')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'pending', "paymentMethodId" character varying, "transactionId" character varying, "currency" character varying, "description" text, "paidAt" TIMESTAMP, "platformFee" numeric(5,2) NOT NULL DEFAULT '0', "netAmount" numeric(10,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "collaborationId" uuid, "payerId" uuid, "payeeId" uuid, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "attachmentUrl" character varying, "readAt" TIMESTAMP, "isSystemMessage" boolean NOT NULL DEFAULT false, "conversationId" character varying, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "senderId" uuid, "recipientId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('new_campaign', 'proposal_received', 'proposal_accepted', 'proposal_rejected', 'contract_ready', 'deliverable_submitted', 'deliverable_approved', 'payment_received', 'message_received', 'collaboration_completed')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "read" boolean NOT NULL DEFAULT false, "metadata" jsonb, "actionUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."campaign_analytics_platform_enum" AS ENUM('instagram', 'youtube', 'tiktok', 'twitter', 'linkedin', 'facebook')`);
        await queryRunner.query(`CREATE TABLE "campaign_analytics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "platform" "public"."campaign_analytics_platform_enum" NOT NULL, "date" date NOT NULL, "impressions" integer NOT NULL DEFAULT '0', "reach" integer NOT NULL DEFAULT '0', "engagement" integer NOT NULL DEFAULT '0', "clicks" integer NOT NULL DEFAULT '0', "conversions" integer NOT NULL DEFAULT '0', "cost" numeric(10,2) NOT NULL DEFAULT '0', "cpm" numeric(10,4) NOT NULL DEFAULT '0', "cpc" numeric(10,4) NOT NULL DEFAULT '0', "cpa" numeric(10,4) NOT NULL DEFAULT '0', "roi" numeric(5,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "campaignId" uuid, CONSTRAINT "PK_9d8b8259ec36bae55bdf6aee439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "brand_profiles" ADD CONSTRAINT "FK_f1485d18dd67c61ac6db30d8a7a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_d7b20e0858a4fe69b565714bf3b" FOREIGN KEY ("collaborationId") REFERENCES "collaborations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliverables" ADD CONSTRAINT "FK_c4893ba598fd14d06edc467daa1" FOREIGN KEY ("collaborationId") REFERENCES "collaborations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_8392444af385900b8ecf5761394" FOREIGN KEY ("collaborationId") REFERENCES "collaborations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_f9238c3e3739dc40322f577fc46" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_c8f626e1e943aabb0f90fb8ee61" FOREIGN KEY ("revieweeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborations" ADD CONSTRAINT "FK_4a2d5e7aa9cdc208834ec2cf2dc" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborations" ADD CONSTRAINT "FK_442c195208bc2f3f2ff2fe90d6b" FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_6651ca449510870a3c29a8e7bd8" FOREIGN KEY ("brandProfileId") REFERENCES "brand_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposals" ADD CONSTRAINT "FK_81fedead7e3df7044310d4bd472" FOREIGN KEY ("creatorProfileId") REFERENCES "creator_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposals" ADD CONSTRAINT "FK_2b1617c9f6c0ee726998b9e4c03" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "platform_integrations" ADD CONSTRAINT "FK_45a8d04a1a00cb835847b637ead" FOREIGN KEY ("creatorProfileId") REFERENCES "creator_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "creator_analytics" ADD CONSTRAINT "FK_3acdf7ddb6f4d3501564edadd9b" FOREIGN KEY ("creatorProfileId") REFERENCES "creator_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" ADD CONSTRAINT "FK_666d6a0fef932ec2c5fea7dff82" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_926664e1722f1db39b4d4a25e4c" FOREIGN KEY ("collaborationId") REFERENCES "collaborations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_ff40a657baa9226eb63c6c01dd3" FOREIGN KEY ("payerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_86b58f0ea2231253485e5087b0e" FOREIGN KEY ("payeeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_f548818d46a1315d4e1d5e62da5" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaign_analytics" ADD CONSTRAINT "FK_9cbb63e4d77ce976a9632487d90" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign_analytics" DROP CONSTRAINT "FK_9cbb63e4d77ce976a9632487d90"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_f548818d46a1315d4e1d5e62da5"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_86b58f0ea2231253485e5087b0e"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_ff40a657baa9226eb63c6c01dd3"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_926664e1722f1db39b4d4a25e4c"`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" DROP CONSTRAINT "FK_666d6a0fef932ec2c5fea7dff82"`);
        await queryRunner.query(`ALTER TABLE "creator_analytics" DROP CONSTRAINT "FK_3acdf7ddb6f4d3501564edadd9b"`);
        await queryRunner.query(`ALTER TABLE "platform_integrations" DROP CONSTRAINT "FK_45a8d04a1a00cb835847b637ead"`);
        await queryRunner.query(`ALTER TABLE "proposals" DROP CONSTRAINT "FK_2b1617c9f6c0ee726998b9e4c03"`);
        await queryRunner.query(`ALTER TABLE "proposals" DROP CONSTRAINT "FK_81fedead7e3df7044310d4bd472"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_6651ca449510870a3c29a8e7bd8"`);
        await queryRunner.query(`ALTER TABLE "collaborations" DROP CONSTRAINT "FK_442c195208bc2f3f2ff2fe90d6b"`);
        await queryRunner.query(`ALTER TABLE "collaborations" DROP CONSTRAINT "FK_4a2d5e7aa9cdc208834ec2cf2dc"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_c8f626e1e943aabb0f90fb8ee61"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_f9238c3e3739dc40322f577fc46"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_8392444af385900b8ecf5761394"`);
        await queryRunner.query(`ALTER TABLE "deliverables" DROP CONSTRAINT "FK_c4893ba598fd14d06edc467daa1"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_d7b20e0858a4fe69b565714bf3b"`);
        await queryRunner.query(`ALTER TABLE "brand_profiles" DROP CONSTRAINT "FK_f1485d18dd67c61ac6db30d8a7a"`);
        await queryRunner.query(`DROP TABLE "campaign_analytics"`);
        await queryRunner.query(`DROP TYPE "public"."campaign_analytics_platform_enum"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "creator_profiles"`);
        await queryRunner.query(`DROP TABLE "creator_analytics"`);
        await queryRunner.query(`DROP TYPE "public"."creator_analytics_platform_enum"`);
        await queryRunner.query(`DROP TABLE "platform_integrations"`);
        await queryRunner.query(`DROP TYPE "public"."platform_integrations_platform_enum"`);
        await queryRunner.query(`DROP TABLE "proposals"`);
        await queryRunner.query(`DROP TYPE "public"."proposals_status_enum"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP TYPE "public"."campaigns_platforms_enum"`);
        await queryRunner.query(`DROP TABLE "collaborations"`);
        await queryRunner.query(`DROP TYPE "public"."collaborations_status_enum"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TYPE "public"."reviews_visibility_enum"`);
        await queryRunner.query(`DROP TABLE "deliverables"`);
        await queryRunner.query(`DROP TYPE "public"."deliverables_status_enum"`);
        await queryRunner.query(`DROP TABLE "contracts"`);
        await queryRunner.query(`DROP TYPE "public"."contracts_status_enum"`);
        await queryRunner.query(`DROP TABLE "brand_profiles"`);
    }

}
