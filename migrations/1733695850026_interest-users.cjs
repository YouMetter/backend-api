/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('interest_users', {
        user_id: { type: 'varchar(255)', notNull: true, references: 'users', onDelete: 'CASCADE'},
        category_id: { type: 'varchar(255)', notNull: true, references: 'categories', onDelete: 'CASCADE'}
    })

    pgm.createConstraint('interest_users', 'fk_interest_users_user_id', {
        foreignKeys: {
            columns: 'user_id',
            references: 'users(id)',
            onDelete: 'CASCADE'
        }
    })

    pgm.createConstraint('interest_users', 'fk_interest_users_category_id', {
        foreignKeys: {
            columns: 'category_id',
            references: 'categories(id)',
            onDelete: 'CASCADE'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('interest_users')
};
