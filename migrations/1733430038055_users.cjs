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
    pgm.createTable('users', {
        id: {type: 'varchar(255)', notNull: true, primaryKey: true},
        name: {type: 'varchar(36)'},
        username: { type: 'varchar(16)', notNull: true, unique: true},
        password: {type: 'varchar(255)', notNull: true},
        email: {type: 'varchar(255)', notNull: true, unique: true},
        profile_image: {type: 'varchar(300)'},
        created_at: {
            type: 'TIMESTAMPTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),
          },
          updated_at: {
            type: 'TIMESTAMPTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),
          },
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('users')
};
