import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFieldsToUser1753181678142 implements MigrationInterface {
    name = 'AddNewFieldsToUser1753181678142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand_profiles" DROP COLUMN "logoUrl"`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" DROP COLUMN "profileImage"`);
        await queryRunner.query(`ALTER TABLE "brand_profiles" ADD "logoFilename" character varying`);
        await queryRunner.query(`ALTER TABLE "brand_profiles" ADD "logoMimetype" character varying`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" ADD "profileImageFilename" character varying`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" ADD "profileImageMimetype" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" DROP COLUMN "profileImageMimetype"`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" DROP COLUMN "profileImageFilename"`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "brand_profiles" DROP COLUMN "logoMimetype"`);
        await queryRunner.query(`ALTER TABLE "brand_profiles" DROP COLUMN "logoFilename"`);
        await queryRunner.query(`ALTER TABLE "creator_profiles" ADD "profileImage" character varying`);
        await queryRunner.query(`ALTER TABLE "brand_profiles" ADD "logoUrl" character varying`);
    }

}
