import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeEmailUniqAddNamesToUsers1595795856667 implements MigrationInterface {
  name = "MakeEmailUniqAddNamesToUsers1595795856667";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
  }
}
