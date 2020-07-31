import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSomeRelations1596231671169 implements MigrationInterface {
  name = "FixSomeRelations1596231671169";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription_item" DROP CONSTRAINT "FK_c03f44801c0d37013388f840c90"`);
    await queryRunner.query(`CREATE TABLE "subscription_item_products" ("amount" integer NOT NULL, "subscription_item_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_7a78d3ed9e96bce34d399e1a6e6" PRIMARY KEY ("subscription_item_id", "product_id"))`);
    await queryRunner.query(`ALTER TABLE "subscription_item" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "subscription_item" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "subscription_type" ADD "amount" integer NOT NULL DEFAULT 1`);
    await queryRunner.query(`ALTER TABLE "subscription_item_products" ADD CONSTRAINT "FK_b8769df344c7200594c19e990bf" FOREIGN KEY ("subscription_item_id") REFERENCES "subscription_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "subscription_item_products" ADD CONSTRAINT "FK_fdb5fe50bc0a7f3bf594054cb05" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription_item_products" DROP CONSTRAINT "FK_fdb5fe50bc0a7f3bf594054cb05"`);
    await queryRunner.query(`ALTER TABLE "subscription_item_products" DROP CONSTRAINT "FK_b8769df344c7200594c19e990bf"`);
    await queryRunner.query(`ALTER TABLE "subscription_type" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "subscription_item" ADD "productId" integer`);
    await queryRunner.query(`ALTER TABLE "subscription_item" ADD "amount" integer NOT NULL DEFAULT 1`);
    await queryRunner.query(`DROP TABLE "subscription_item_products"`);
    await queryRunner.query(`ALTER TABLE "subscription_item" ADD CONSTRAINT "FK_c03f44801c0d37013388f840c90" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
