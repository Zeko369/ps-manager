import { MigrationInterface, QueryRunner } from "typeorm";

export class MoveAmountFromSItoST1596223151557 implements MigrationInterface {
  name = "MoveAmountFromSItoST1596223151557";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription_item" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "subscription_type" ADD "amount" integer NOT NULL DEFAULT 1`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription_type" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "subscription_item" ADD "amount" integer NOT NULL DEFAULT 1`);
  }
}
