import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup1732979509416 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.user(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            is_active SMALLINT NOT NULL DEFAULT '1',
            created_by VARCHAR(255) NULL DEFAULT 'SYSTEM',
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`Drop table public.user`);
  }
}
