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
    pgm.createTable('category_tests', {
        test_id: { type: 'varchar(255)', notNull: true, references: 'tests', onDelete: 'CASCADE'},
        scoope_id: { type: 'varchar(255)', notNull: true, references: 'scoope_question_tests', onDelete: 'CASCADE'}
    })

    pgm.addConstraint('category_tests', 'fk_category_tests_test_id', {
        foreignKeys: {
            columns: 'test_id',
            references: 'tests(id)',
            onDelete: 'CASCADE'
        }
    })

    pgm.addConstraint('category_tests', 'fk_category_test_scoope_id', {
        foreignKeys: {
            columns: 'scoope_id',
            references: 'scoope_question_tests',
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
    pgm.dropTable('category_tests')
};
