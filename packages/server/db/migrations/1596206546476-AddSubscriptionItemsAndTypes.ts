import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubscriptionItemsAndTypes1596206546476 implements MigrationInterface {
  name = "AddSubscriptionItemsAndTypes1596206546476";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "subscription_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "name" character varying NOT NULL, "price" double precision, "subscriptionItemsOrder" integer array NOT NULL, CONSTRAINT "UQ_95ca4a46e2e6eea3ab7872ccaaa" UNIQUE ("slug"), CONSTRAINT "PK_13bf5fb01dc4c8909a555120da5" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "subscription_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL DEFAULT 1, "productId" integer, "subscriptionTypeId" integer, CONSTRAINT "PK_55d70ad91c5aa7228b6d0642fc9" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "subscription_item" ADD CONSTRAINT "FK_c03f44801c0d37013388f840c90" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "subscription_item" ADD CONSTRAINT "FK_181369b3257826b598e2f781964" FOREIGN KEY ("subscriptionTypeId") REFERENCES "subscription_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscription_item" DROP CONSTRAINT "FK_181369b3257826b598e2f781964"`);
    await queryRunner.query(`ALTER TABLE "subscription_item" DROP CONSTRAINT "FK_c03f44801c0d37013388f840c90"`);
    await queryRunner.query(`DROP TABLE "subscription_item"`);
    await queryRunner.query(`DROP TABLE "subscription_type"`);
  }
}
