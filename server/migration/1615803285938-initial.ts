import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class initial1615803285938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0`);
    await queryRunner.query(`DROP TABLE IF EXISTS role_members_user`);
    await queryRunner.query(`DROP TABLE IF EXISTS role`);
    await queryRunner.query(`DROP TABLE IF EXISTS user`);
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=1`);

    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          {
            name: 'id',
            type: 'INT(11)',
            isPrimary: true,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `CREATE TABLE user (
        id varchar(36),
        firstname varchar(255),
        lastname varchar(255),
        password varchar(255),
        email varchar(255),
        FULLTEXT (firstname),
        FULLTEXT (lastname),
        FULLTEXT (email),
        PRIMARY KEY (id)
        ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `
      CREATE TABLE role_members_user (
      userId varchar(36),
      roleId INT(11),
      FOREIGN KEY (userId) REFERENCES user (id) ON DELETE RESTRICT ON UPDATE CASCADE,
      FOREIGN KEY (roleId) REFERENCES role (id) ON DELETE RESTRICT ON UPDATE CASCADE
      )
      `,
    );

    await queryRunner.query(`INSERT INTO role (id, role) VALUES (1, "user")`);
    await queryRunner.query(
      `INSERT INTO role (id, role) VALUES (2, "manager")`,
    );
    await queryRunner.query(`INSERT INTO role (id, role) VALUES (3, "admin")`);

    const hashPassword = await bcrypt.hash('admin', 10);
    await queryRunner.query(
      `INSERT INTO user VALUES ("uniqueid", "admin", "admin", "${hashPassword}", "admin@email.com")`,
    );
    await queryRunner.query(
      `
      INSERT INTO role_members_user VALUES ("uniqueid", 3)
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE role`);
    await queryRunner.query(`DROP TABLE user`);
    await queryRunner.query(`DROP TABLE role_members_user`);
  }
}
