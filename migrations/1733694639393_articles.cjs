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
    pgm.createTable('categories', {
        id: {type : 'varchar(255)', primaryKey: true, notNull: true},
        title: {type: 'varchar(255)', unique: true, notNull: true},
        created_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')},
        updated_at: {type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    })

    pgm.createTable('articles', {
        id: {type: 'varchar(255)', primaryKey: true, notNull: true},
        category_id: {type: 'varchar(255)', notNull: true, references: 'categories', onDelete: 'CASCADE'},
        title: {type: 'varchar(255)', notNull: true},
        description: {type: 'varchar(255)', notNull: true},
        content: {type: 'text', notNull: true},
        cover_image: {type: 'varchar(300)'},
        created_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')},
        updated_at: {type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    })

    pgm.createConstraint('articles', 'fk_articles_category_id', {
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
    pgm.dropTable('articles')
    pgm.dropTable('categories')
};
