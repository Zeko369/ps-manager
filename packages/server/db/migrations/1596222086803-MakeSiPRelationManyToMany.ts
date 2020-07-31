import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeSiPRelationManyToMany1596222086803 implements MigrationInterface {
  name = "MakeSiPRelationManyToMany1596222086803";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription_item" DROP CONSTRAINT "FK_c03f44801c0d37013388f840c90"`);
    await queryRunner.query(`CREATE TABLE "subscription_item_products_product" ("subscriptionItemId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_f3dabdbe86101432e6360f64e58" PRIMARY KEY ("subscriptionItemId", "productId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_2d0bd867e4c50fe491572db585" ON "subscription_item_products_product" ("subscriptionItemId") `);
    await queryRunner.query(`CREATE INDEX "IDX_a87256bea3759295b9c53ed760" ON "subscription_item_products_product" ("productId") `);
    await queryRunner.query(`ALTER TABLE "subscription_item" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "subscription_item_products_product" ADD CONSTRAINT "FK_2d0bd867e4c50fe491572db585e" FOREIGN KEY ("subscriptionItemId") REFERENCES "subscription_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "subscription_item_products_product" ADD CONSTRAINT "FK_a87256bea3759295b9c53ed760e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription_item_products_product" DROP CONSTRAINT "FK_a87256bea3759295b9c53ed760e"`);
    await queryRunner.query(`ALTER TABLE "subscription_item_products_product" DROP CONSTRAINT "FK_2d0bd867e4c50fe491572db585e"`);
    await queryRunner.query(`ALTER TABLE "subscription_item" ADD "productId" integer`);
    await queryRunner.query(`DROP INDEX "IDX_a87256bea3759295b9c53ed760"`);
    await queryRunner.query(`DROP INDEX "IDX_2d0bd867e4c50fe491572db585"`);
    await queryRunner.query(`DROP TABLE "subscription_item_products_product"`);
    await queryRunner.query(`ALTER TABLE "subscription_item" ADD CONSTRAINT "FK_c03f44801c0d37013388f840c90" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
