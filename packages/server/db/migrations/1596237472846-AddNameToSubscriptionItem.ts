import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameToSubscriptionItem1596237472846 implements MigrationInterface {
  name = "AddNameToSubscriptionItem1596237472846";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription_item" ADD "name" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription_item" DROP COLUMN "name"`);
  }
}
