import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1701901266404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'name',
                    type: 'text'
                },
                {
                    name: 'email',
                    type: 'text',
                },
                {
                    name: "password",
                    type: "text"
                }
        ]
}))
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
