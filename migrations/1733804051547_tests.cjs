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
    pgm.createTable('tests', {
        id: { type: 'varchar(255)', notNull: true, primaryKey: true},
        name: { type: 'varchar(255)', notNull: true, unique: true},
        created_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')},
        updated_at: {type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    })

    pgm.createTable('scoope_question_tests', {
        id: { type: 'varchar(255)', notNull: true, primaryKey: true},
        name: { type: 'varchar(255)', notNull: true, unique: true},
        created_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')},
        updated_at: {type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    })

    pgm.createTable('question_tests', {
        id: { type: 'varchar(225)', notNull: true, primaryKey: true},
        test_id : { type: 'varchar(255)', notNull: true, references: 'tests', onDelete: 'CASCADE'},
        scoope_id : { type: 'varchar(255)', notNull: true, references: 'scoope_question_tests', onDelete: 'CASCADE'},
        description: { type: 'varchar(255)', notNull: true},
        correct_option: { type: 'varchar(255)', notNull: true},
        created_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')},
        updated_at: {type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    })

    pgm.createTable('option_question_tests', {
        id: { type: 'varchar(225)', notNull: true, primaryKey: true},
        question_id: { type: 'varchar(255)', notNull: true, references: 'question_tests', onDelete: 'CASCADE'},
        name: {type: 'varchar(255)', notNull: true},
        created_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    })

    pgm.createTable('submit_tests', {
        id: { type: 'varchar(225)', notNull: true, primaryKey: true},
        user_id: { type: 'varchar(255)', notNull: true, references: 'users', onDelete: 'CASCADE'},
        test_id: { type: 'varchar(255)', notNull: true, references: 'tests', onDelete: 'CASCADE'},
        submitted_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    })

    pgm.createTable('answer_questions', {
        option_id: { type: 'varchar(255)', notNull: true, references: 'option_question_tests', onDelete: 'CASCADE'},
        question_id: { type: 'varchar(255)', notNull: true, references: 'question_tests', onDelete: 'CASCADE'},
        submitted_id: { type: 'varchar(255)', notNull: true, references: 'submit_tests', onDelete: 'CASCADE'}
    }, {
        primaryKey: ['option_id', 'question_id', 'submitted_id']
    })

    pgm.createConstraint('question_tests', 'fk_question_tests_test_id', {
        foreignKeys: {
            columns: 'test_id',
            references: 'tests(id)',
            onDelete: 'CASCADE'
        }
    })

    pgm.createConstraint('question_tests', 'fk_question_tests_scoope_id', {
        foreignKeys: {
            columns: 'scoope_id',
            references: 'scoope_question_tests(id)',
            onDelete: 'CASCADE'
        }
    })

    pgm.createConstraint('option_question_tests', 'fk_option_question_tests_question_id', {
        foreignKeys: {
            columns: 'question_id',
            references: 'question_tests',
            onDelete: 'CASCADE'
        }
    })

    pgm.createConstraint('submit_tests', 'fk_submit_tests_user_id', {
        foreignKeys: {
            columns: 'user_id',
            references: 'users(id)',
            onDelete: 'CASCADE'
        }
    })

    pgm.createConstraint('submit_tests', 'fk_submit_tests_test_id', {
        foreignKeys: {
            columns: 'test_id',
            references: 'tests(id)',
            onDelete: 'CASCADE'
        }
    })

    pgm.createConstraint('answer_questions', 'fk_answer_questions_submitted_id', {
        foreignKeys: {
            columns: 'submitted_id',
            references: 'submit_tests(id)',
            onDelete: 'CASCADE'
        }
    })

    pgm.createConstraint('answer_questions', 'fk_answer_questions_question_id', {
        foreignKeys: {
            columns: 'question_id',
            references: 'question_tests(id)',
            onDelete: 'CASCADE'
        }
    })

    pgm.createConstraint('answer_questions', 'fk_answer_questions_option_id', {
        foreignKeys: {
            columns: 'option_id',
            references: 'option_question_tests(id)',
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
    pgm.dropTable('answer_questions')
    pgm.dropTable('submit_tests')
    pgm.dropTable('option_question_tests')
    pgm.dropTable('question_tests')
    pgm.dropTable('scoope_question_tests')
    pgm.dropTable('tests')
};
