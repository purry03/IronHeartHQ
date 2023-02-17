/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('users',{
		id: 'id',
		name: { type: 'varchar(50)', notNull: true, unique: true },
		admin: {type: 'boolean', notNull: true, default: false},
		roles: {type: 'varchar[]', notNull: true, default: ['user']},
		balance: {type: 'bigint', notNull: true, default: 0},
		password: {type: 'varchar(100)', notNull: true},
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});
};

exports.down = pgm => {};
