import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserAndProfileFields1753533607001 implements MigrationInterface {
  name = 'FixUserAndProfileFields1753533607001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if columns exist before adding them

    // Add isProfileComplete to users if it doesn't exist
    const userTable = await queryRunner.getTable('users');
    if (!userTable.findColumnByName('isProfileComplete')) {
      await queryRunner.query(`ALTER TABLE "users" ADD "isProfileComplete" boolean NOT NULL DEFAULT false`);
    }

    // Add refreshToken to users if it doesn't exist
    if (!userTable.findColumnByName('refreshToken')) {
      await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
    }

    // Set isActive default to false if it's not already
    const isActiveColumn = userTable.findColumnByName('isActive');
    if (isActiveColumn && isActiveColumn.default !== 'false') {
      await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

    // Check brand_profiles table
    const brandTable = await queryRunner.getTable('brand_profiles');

    // Add logoFilename if it doesn't exist
    if (!brandTable.findColumnByName('logoFilename')) {
      await queryRunner.query(`ALTER TABLE "brand_profiles" ADD "logoFilename" character varying`);
    }

    // Add logoMimetype if it doesn't exist
    if (!brandTable.findColumnByName('logoMimetype')) {
      await queryRunner.query(`ALTER TABLE "brand_profiles" ADD "logoMimetype" character varying`);
    }

    // Remove logoUrl if it exists
    if (brandTable.findColumnByName('logoUrl')) {
      await queryRunner.query(`ALTER TABLE "brand_profiles" DROP COLUMN "logoUrl"`);
    }

    // Check creator_profiles table
    const creatorTable = await queryRunner.getTable('creator_profiles');

    // Add name if it doesn't exist
    if (!creatorTable.findColumnByName('name')) {
      await queryRunner.query(`ALTER TABLE "creator_profiles" ADD "name" character varying`);
    }

    // Add profileImageFilename if it doesn't exist
    if (!creatorTable.findColumnByName('profileImageFilename')) {
      await queryRunner.query(`ALTER TABLE "creator_profiles" ADD "profileImageFilename" character varying`);
    }

    // Add profileImageMimetype if it doesn't exist
    if (!creatorTable.findColumnByName('profileImageMimetype')) {
      await queryRunner.query(`ALTER TABLE "creator_profiles" ADD "profileImageMimetype" character varying`);
    }

    // Remove profileImage if it exists
    if (creatorTable.findColumnByName('profileImage')) {
      await queryRunner.query(`ALTER TABLE "creator_profiles" DROP COLUMN "profileImage"`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverse the changes
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "refreshToken"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "isProfileComplete"`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);

    await queryRunner.query(`ALTER TABLE "creator_profiles" DROP COLUMN IF EXISTS "profileImageMimetype"`);
    await queryRunner.query(`ALTER TABLE "creator_profiles" DROP COLUMN IF EXISTS "profileImageFilename"`);
    await queryRunner.query(`ALTER TABLE "creator_profiles" DROP COLUMN IF EXISTS "name"`);
    await queryRunner.query(`ALTER TABLE "creator_profiles" ADD "profileImage" character varying`);

    await queryRunner.query(`ALTER TABLE "brand_profiles" DROP COLUMN IF EXISTS "logoMimetype"`);
    await queryRunner.query(`ALTER TABLE "brand_profiles" DROP COLUMN IF EXISTS "logoFilename"`);
    await queryRunner.query(`ALTER TABLE "brand_profiles" ADD "logoUrl" character varying`);
  }
}